import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, addDoc, Timestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../api/firebase'
import { useAuth } from '../context/AuthContext'

export interface Website {
  id: string
  url: string
  status: 'Up' | 'Down'
  statusCode?: number
  responseTime: number
  uptime: number
  lastChecked: Timestamp
  lastDowntime: Timestamp | null
  responseTimes: { time: Timestamp; value: number }[]
}

export function useWebsites() {
  const [websites, setWebsites] = useState<Website[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'websites'), where('userId', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const websiteData: Website[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Website))
      setWebsites(websiteData)
    })

    return () => unsubscribe()
  }, [user])

  const addWebsite = async (url: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const statusData = await response.json();

      await addDoc(collection(db, 'websites'), {
        userId: user.uid,
        url,
        status: statusData.status,
        statusCode: statusData.statusCode,
        responseTime: statusData.responseTime,
        uptime: 100,
        lastChecked: Timestamp.now(),
        lastDowntime: statusData.status === 'Down' ? Timestamp.now() : null,
        responseTimes: [statusData.responseTime],
      })
    } catch (error) {
      console.error('Error adding website:', error)
      throw error
    }
  }

  const updateWebsite = async (websiteId: string, data: Partial<Website>) => {
    if (!user) throw new Error("User not authenticated")

    try {
      await updateDoc(doc(db, 'websites', websiteId), data)
    } catch (error) {
      console.error('Error updating website:', error)
      throw error
    }
  }

  const deleteWebsite = async (websiteId: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      await deleteDoc(doc(db, 'websites', websiteId))
    } catch (error) {
      console.error('Error deleting website:', error)
      throw error
    }
  }

  const refreshWebsite = async (websiteId: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const website = websites.find(w => w.id === websiteId)
      if (!website) throw new Error("Website not found")

      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: website.url }),
      })
      const statusData = await response.json()

      await updateDoc(doc(db, 'websites', websiteId), {
        status: statusData.status,
        statusCode: statusData.statusCode,
        responseTime: statusData.responseTime,
        lastChecked: Timestamp.now(),
        lastDowntime: statusData.status === 'Down' ? Timestamp.now() : website.lastDowntime,
        responseTimes: [...website.responseTimes, {
          time: Timestamp.now(),
          value: statusData.responseTime
        }].slice(-50)
      })
    } catch (error) {
      console.error('Error refreshing website:', error)
      throw error
    }
  }

  return { websites, addWebsite, updateWebsite, deleteWebsite, refreshWebsite }
}