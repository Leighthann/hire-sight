"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, error: authError, isDemoMode, isUsingEmulators, emulatorStatus, switchToDemoMode } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showNetworkError, setShowNetworkError] = useState(false)

  useEffect(() => {
    if (authError) {
      if (authError.includes("network-request-failed") || authError.includes("Network connection failed")) {
        setShowNetworkError(true)
      }

      toast({
        title: "Authentication Error",
        description: authError,
        variant: "destructive",
      })
    }
  }, [authError, toast])

  // If we're in demo mode, show a notification
  useEffect(() => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode Active",
        description: "Using demo mode with mock data. Registration will create a demo account.",
        duration: 5000,
      })
    }
  }, [isDemoMode, toast])

  // If we successfully register with demo mode, redirect to dashboard
  useEffect(() => {
    if (isDemoMode && !isLoading) {
      router.push("/dashboard")
    }
  }, [isDemoMode, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowNetworkError(false)

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await signUp(email, password, name, "recruiter")

      // Only show success toast if we're not in demo mode (demo mode will redirect automatically)
      if (!isDemoMode) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during registration."

      // Handle specific Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try another email or login."
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format."
      } else if (error.code === "auth/invalid-api-key") {
        errorMessage = "Authentication service is currently unavailable. Please try again later."
      } else if (error.code === "auth/network-request-failed") {
        setShowNetworkError(true)
        if (isUsingEmulators) {
          errorMessage =
            "Could not connect to Firebase emulators. Make sure they are running with 'firebase emulators:start'."
        } else {
          errorMessage = "Network connection failed. Please check your internet connection and try again."
        }
      }

      // Only show toast if we're not switching to demo mode
      if (
        !(error.code === "auth/network-request-failed" && isUsingEmulators && process.env.NODE_ENV === "development")
      ) {
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoMode = () => {
    switchToDemoMode()
    toast({
      title: "Demo Mode Activated",
      description: "You are now using demo mode with mock data.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col">
      {/* Simple header */}
      <header className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-blue-400">
              HireSight
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Create an account</h2>
                  <p className="text-gray-400 mt-2">Enter your details to create a new account</p>
                </div>

                {showNetworkError && (
                  <Card className="bg-amber-900/30 border-amber-800">
                    <CardContent className="pt-6 pb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="mr-2 h-5 w-5 text-amber-400 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-300">Firebase Connection Issue</h3>
                          <p className="text-sm text-amber-300/80 mt-1">
                            {isUsingEmulators
                              ? "Firebase emulators are enabled but not responding. Make sure they are running with 'firebase emulators:start'."
                              : "Network connection to Firebase failed. This could be due to network issues or Firebase service disruption."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isDemoMode && (
                  <div className="rounded-md bg-blue-900/30 border border-blue-800 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-300">Demo Mode Active</h3>
                        <div className="mt-2 text-sm text-blue-300/80">
                          <p>The app is running in demo mode. Registration will create a demo account.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-200">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-200">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700"
                    disabled={isLoading || isDemoMode}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : isDemoMode ? (
                      "Redirecting to dashboard..."
                    ) : (
                      "Create account"
                    )}
                  </Button>

                  {!isDemoMode && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={handleDemoMode}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Continue in Demo Mode
                    </Button>
                  )}

                  <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-brand-400 hover:text-brand-300">
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HireSight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

