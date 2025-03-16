"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "recruiter" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading, error } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If Firebase is not properly configured, still allow access in development
    if (error && error.includes("auth/invalid-api-key") && process.env.NODE_ENV === "development") {
      console.warn("Protected route accessed in demo mode due to Firebase configuration issues")
      return
    }

    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }

    if (!loading && user && requiredRole && user.role !== requiredRole) {
      router.push("/dashboard")
    }
  }, [user, loading, router, pathname, requiredRole, error])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    )
  }

  // If Firebase is not properly configured, still render children in development
  if (error && error.includes("auth/invalid-api-key") && process.env.NODE_ENV === "development") {
    console.warn("Protected route rendered in demo mode due to Firebase configuration issues")
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

