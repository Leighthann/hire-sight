"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, user, error: authError, isDemoMode, isUsingEmulators, emulatorStatus, switchToDemoMode } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"
  const { toast } = useToast()
  const [showNetworkError, setShowNetworkError] = useState(false)

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push(redirect)
    }
  }, [user, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShowNetworkError(false)

    try {
      await signIn(email, password)
      // The redirect will happen in the useEffect above when user is set
    } catch (error: any) {
      // Only show error toast if we're not switching to demo mode
      if (
        !(error.code === "auth/network-request-failed" && isUsingEmulators && process.env.NODE_ENV === "development")
      ) {
        let errorMessage = "Please check your credentials and try again."

        // Handle specific Firebase auth errors
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          errorMessage = "Invalid email or password."
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many failed login attempts. Please try again later."
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

        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Display auth context errors
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
        description: "Using demo mode with mock data. Any email/password combination will work.",
        duration: 5000,
      })
    }
  }, [isDemoMode, toast])

  const handleDemoMode = () => {
    switchToDemoMode()
    toast({
      title: "Demo Mode Activated",
      description: "You are now using demo mode with mock data.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
        <p className="text-gray-400 mt-2">Enter your credentials to access your dashboard</p>
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
                <p>The app is running in demo mode. Any email/password combination will work.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="email"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Link href="/forgot-password" className="text-sm font-medium text-brand-400 hover:text-brand-300">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700"
          disabled={isLoading || (isDemoMode && user !== null)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : isDemoMode && user !== null ? (
            "Redirecting to dashboard..."
          ) : (
            "Sign in"
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
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-brand-400 hover:text-brand-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

