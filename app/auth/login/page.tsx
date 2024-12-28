'use client'

import { useState, useEffect } from 'react'
import { signIn, signInWithGoogle } from '../../utils/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (user) {
      toast({
        title: "Already authenticated",
        description: "You are already logged in.",
        variant: "default",
      })
      router.push('/')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      })
      router.push('/')
    } catch (error) {
      console.error('Error signing in:', error)
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        console.log('Sign-in cancelled by user');
        toast({
          title: "Sign-in cancelled",
          description: "You closed the Google sign-in window.",
          variant: "default",
        });
        return;
      }

      toast({
        title: "Welcome!",
        description: "You've successfully signed in with Google.",
      });
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error) {
        const errCode = (error as { code: string }).code;

        switch (errCode) {
          case 'auth/popup-blocked':
            console.warn('Popup was blocked by the browser:', error);
            toast({
              title: "Popup Blocked",
              description: "Please allow popups for this website and try again.",
              variant: "destructive",
            });
            break;

          case 'auth/network-request-failed':
            console.error('Network error occurred:', error);
            toast({
              title: "Network Error",
              description: "Please check your internet connection and try again.",
              variant: "destructive",
            });
            break;

          default:
            console.error('Error signing in with Google:', error);
            toast({
              title: "Error",
              description: "Could not sign in with Google. Please try again.",
              variant: "destructive",
            });
            break;
        }
      } else {
        console.error('Unknown error signing in with Google:', error);
        toast({
          title: "Error",
          description: "An unknown error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-600">Log in to monitor your websites</p>
        </div>

        <Card className="p-6 shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "h-11 px-4 border-gray-200",
                  "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                  "transition-all duration-200"
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "h-11 px-4 border-gray-200",
                    "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-11 text-base font-semibold",
                "bg-gradient-to-r from-indigo-600 to-purple-600",
                "hover:from-indigo-700 hover:to-purple-700",
                "transition-all duration-200 transform hover:scale-[1.02]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={cn(
                "w-full mt-4 h-11",
                "border-2 border-gray-200",
                "hover:bg-gray-50 hover:border-gray-300",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <FaGoogle className="mr-2" />
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className={cn(
              "font-semibold text-indigo-600 hover:text-indigo-500",
              "transition-colors duration-200"
            )}
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}