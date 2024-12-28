'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'

interface CheckResult {
    status: 'Up' | 'Down'
    responseTime: number
    timestamp: string
    statusCode?: number
    error?: string
}

export function StatusChecker() {
    const [url, setUrl] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const [result, setResult] = useState<CheckResult | null>(null)

    const checkWebsite = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsChecking(true)
        setResult(null)

        try {
            const response = await fetch('/api/check-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            })

            const data = await response.json()

            setResult(data)

            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    variant: "destructive",
                })
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to check website status.",
                variant: "destructive",
            })
        } finally {
            setIsChecking(false)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Check Website Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={checkWebsite} className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="url"
                                placeholder="Enter website URL (e.g., https://example.com)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className={cn(
                                    "h-11 px-4 border-gray-200",
                                    "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                                    "transition-all duration-200"
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isChecking}
                                className={cn(
                                    "px-6 h-11",
                                    "bg-gradient-to-r from-indigo-600 to-purple-600",
                                    "hover:from-indigo-700 hover:to-purple-700",
                                    "transition-all duration-200",
                                    "disabled:opacity-50"
                                )}
                            >
                                {isChecking ? 'Checking...' : 'Check Status'}
                            </Button>
                        </div>
                    </form>

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6"
                            >
                                <div className="rounded-lg bg-gray-50 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Status Results</h3>
                                        <span className="text-sm text-gray-500">
                                            {result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : ''}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            {result.status === 'Up' ? (
                                                <FaCheckCircle className="w-6 h-6 text-green-500" />
                                            ) : (
                                                <FaTimesCircle className="w-6 h-6 text-red-500" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Status</p>
                                                <p className={cn(
                                                    "text-lg font-semibold",
                                                    result.status === 'Up' ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {result.status}
                                                    {result.statusCode && ` (${result.statusCode})`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <FaClock className="w-6 h-6 text-indigo-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Response Time</p>
                                                <p className="text-lg font-semibold text-indigo-600">
                                                    {result.responseTime}ms
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    )
}
