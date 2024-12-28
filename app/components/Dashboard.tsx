'use client'

import { useWebsites } from '../hooks/useWebstites'

export function Dashboard() {
  const { websites } = useWebsites()

  const totalSites = websites.length
  const upSites = websites.filter(site => site.status === 'Up').length
  const averageResponseTime = websites.reduce((acc, site) => acc + site.responseTime, 0) / totalSites || 0
  const overallUptime = websites.reduce((acc, site) => acc + site.uptime, 0) / totalSites || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardCard title="Total Sites" value={totalSites} />
      <DashboardCard title="Sites Up" value={upSites} />
      <DashboardCard title="Avg Response Time" value={`${averageResponseTime.toFixed(2)}ms`} />
    </div>
  )
}

function DashboardCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}