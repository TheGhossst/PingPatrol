'use client'

import { useState } from 'react'
import { useWebsites } from '../hooks/useWebstites'
import { useAuth } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export function AddWebsiteForm() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { addWebsite } = useWebsites()
  const { user, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a website.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)

    try {
      await addWebsite(url)
      setUrl('')
      toast({
        title: "Website added",
        description: `${url} has been added to monitoring.`,
      })
    } catch (error) {
      console.error('Error adding website:', error)
      toast({
        title: "Error",
        description: "Failed to add website. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add New Website</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please <Link href="/auth/login" className="text-blue-500 hover:underline">log in</Link> to add a website.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Add New Website</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Website'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}