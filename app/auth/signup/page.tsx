'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../../utils/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGoogleSignUp = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            toast({
                title: "Account created!",
                description: `Welcome, ${user.displayName || "User"}`,
            });
            console.log("User Info:", user);
            router.push('/');
        } catch (error) {
            console.error("Google Sign-Up Error:", error);
            toast({
                title: "Error",
                description: "Failed to sign up with Google. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please ensure both passwords are the same.",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        try {
            await signUp(email, password);
            toast({
                title: "Account created!",
                description: "Welcome to PingPatrol.",
            });
            router.push('/');
        } catch (error) {
            console.error('Error signing up:', error);
            toast({
                title: "Error",
                description: "Failed to create account. Please try again.",
                variant: "destructive",
            });
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
                        Create Account
                    </motion.h1>
                    <p className="text-gray-600">Join PingPatrol to monitor your websites</p>
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
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={cn(
                                    "h-11 px-4 border-gray-200",
                                    "focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                                    "transition-all duration-200"
                                )}
                            />
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
                            {isLoading ? 'Creating account...' : 'Create Account'}
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
                            onClick={handleGoogleSignUp}
                            className={cn(
                                "w-full mt-4 h-11",
                                "border-2 border-gray-200",
                                "hover:bg-gray-50 hover:border-gray-300",
                                "transition-all duration-200"
                            )}
                            disabled={isLoading}
                        >
                            <FaGoogle className="mr-2" />
                            {isLoading ? "Signing up..." : "Sign up with Google"}
                        </Button>

                    </div>
                </Card>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className={cn(
                            "font-semibold text-indigo-600 hover:text-indigo-500",
                            "transition-colors duration-200"
                        )}
                    >
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}