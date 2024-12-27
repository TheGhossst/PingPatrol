'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { signOut } from '../utils/firebase'
import { toast } from '@/hooks/use-toast'

export function Navbar() {
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">PingPatrol</span>
            </Link>
          </div>
          <div className="flex items-center">
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <>
                <span className="text-gray-700 mr-4">Welcome, {user.email}</span>
                <Button onClick={handleSignOut} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" passHref>
                  <Button variant="ghost" className="mr-2">Login</Button>
                </Link>
                <Link href="/auth/signup" passHref>
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}