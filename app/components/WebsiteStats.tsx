'use client'

import { Website } from '../hooks/useWebstites'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface WebsiteStatsProps {
  website: Website
  onClose: () => void
}

export function WebsiteStats({ website, onClose }: WebsiteStatsProps) {
  const chartData = website.responseTimes
    ?.filter(rt => rt && rt.time && typeof rt.time.toDate === 'function')
    ?.map(rt => ({
      time: rt.time.toDate().toLocaleTimeString(),
      responseTime: rt.value
    })) || []

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{website.url} - Detailed Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={website.status === 'Up' ? 'text-green-600' : 'text-red-600'}>
                {website.status}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{website.responseTime}ms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Last Downtime</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {website.lastDowntime && typeof website.lastDowntime.toDate === 'function'
                  ? website.lastDowntime.toDate().toLocaleString()
                  : 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Response Time History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}