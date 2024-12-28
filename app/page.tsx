'use client'

import { WebsiteList } from './components/WebsiteList'
import { Dashboard } from './components/Dashboard'
import { AddWebsiteForm } from './components/AddWebsiteForm'
import { StatusChecker } from './components/StatusChecker'
import { Button } from '@/components/ui/button'
import { useAuth } from './context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  const handleGetStarted = () => {
    if (user) {
      document.getElementById('status-checker')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      window.location.href = '/auth/login'
    }
  }

  return (
    <main>
      <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-md animate-fade-in">
            Welcome to <span className="text-yellow-300">PingPatrol</span>
          </h1>
          <p className="text-2xl font-light mb-10 opacity-90">
            Monitor your websites with ease and precision.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </Button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute bg-white opacity-30 w-32 h-32 rounded-full top-10 left-10 blur-3xl"></div>
          <div className="absolute bg-yellow-400 opacity-20 w-40 h-40 rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
      </section>

      <section id="status-checker" className="py-12 bg-gray-50">
        <StatusChecker />
      </section>

      <section className="container mx-auto px-4 py-12">
        <Dashboard />
        <AddWebsiteForm />
        <WebsiteList />
      </section>
    </main>
  )
}

