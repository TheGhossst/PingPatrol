'use client'

import { useWebsites, Website } from '../hooks/useWebstites'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WebsiteStats } from './WebsiteStats'
import { useState } from 'react'
import { FaSync, FaTrash } from 'react-icons/fa'
import { toast } from '@/hooks/use-toast'

export function WebsiteList() {
  const { websites, deleteWebsite, refreshWebsite } = useWebsites()
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const handleDelete = async (e: React.MouseEvent, websiteId: string) => {
    e.stopPropagation() // Prevent row click
    try {
      await deleteWebsite(websiteId)
      toast({
        title: "Website deleted",
        description: "The website has been removed from monitoring.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete the website. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRefresh = async (e: React.MouseEvent, websiteId: string) => {
    e.stopPropagation() // Prevent row click
    setLoading(prev => ({ ...prev, [websiteId]: true }))
    try {
      await refreshWebsite(websiteId)
      toast({
        title: "Status updated",
        description: "The website status has been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not refresh the website status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(prev => ({ ...prev, [websiteId]: false }))
    }
  }

  const getStatusVariant = (status: Website['status']) => {
    return status === 'Up' ? 'default' : 'destructive'
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Monitored Websites</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Last Downtime</TableHead>
              <TableHead>Last Checked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website.id} className="cursor-pointer" onClick={() => setSelectedWebsite(website.id)}>
                <TableCell>{website.url}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(website.status)}>
                    {website.status}
                  </Badge>
                </TableCell>
                <TableCell>{website.responseTime}ms</TableCell>
                <TableCell>{website.uptime?.toFixed(2) ?? '0.00'}%</TableCell>
                <TableCell>
                  {website.lastDowntime && typeof website.lastDowntime.toDate === 'function'
                    ? website.lastDowntime.toDate().toLocaleString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{website.lastChecked.toDate().toLocaleString()}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleRefresh(e, website.id)}
                    disabled={loading[website.id]}
                  >
                    <FaSync className={`h-4 w-4 ${loading[website.id] ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDelete(e, website.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedWebsite && (
          <WebsiteStats 
            website={websites.find(w => w.id === selectedWebsite)!} 
            onClose={() => setSelectedWebsite(null)} 
          />
        )}
      </CardContent>
    </Card>
  )
}