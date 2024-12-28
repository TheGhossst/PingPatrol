import { NextApiRequest, NextApiResponse } from 'next'
import { db } from './firebase'
import { doc, updateDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { websiteId, url } = req.body

  try {
    const response = await fetch(url)
    const status = response.ok ? 'Up' : 'Down'
    const responseTime = response.status === 200 ? response.headers.get('x-response-time') : 0

    await updateDoc(doc(db, 'websites', websiteId), {
      status,
      responseTime,
      lastChecked: new Date(),
    })

    res.status(200).json({ message: 'Website checked successfully' })
  } catch (error) {
    console.error('Error checking website:', error)
    res.status(500).json({ message: 'Error checking website' })
  }
}
