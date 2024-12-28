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

  const getStatusDisplay = () => {
    if (!website.statusCode) return website.status;
    return `${website.status} (${website.statusCode})`;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="pb-2">
          <DialogTitle>{website.url} - Detailed Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <p className={`text-lg font-semibold ${website.status === 'Up' ? 'text-green-600' : 'text-red-600'}`}>
                {getStatusDisplay()}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-lg font-semibold">{website.responseTime}ms</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Last Downtime</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-lg font-semibold">
                {website.lastDowntime && typeof website.lastDowntime.toDate === 'function'
                  ? website.lastDowntime.toDate().toLocaleString()
                  : 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4 shadow-sm">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Response Time History</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  width={40}
                />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}