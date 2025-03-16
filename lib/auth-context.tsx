"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useMemo } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
  type AuthError,
} from "firebase/auth"
import { auth, areEmulatorsConfigured } from "@/lib/firebase"

type UserRole = "recruiter" | "admin"

interface AuthUser extends User {
  role?: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isUsingEmulators: boolean
  emulatorStatus: "connected" | "disconnected" | "unknown"
  isDemoMode: boolean
  switchToDemoMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a demo user object
const createDemoUser = (name = "Demo User", email = "demo@example.com", role: UserRole = "recruiter"): AuthUser => {
  return {
    uid: "demo-user-id",
    displayName: name,
    email: email,
    role: role,
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => "demo-token",
    getIdTokenResult: async () => ({
      token: "demo-token",
      signInProvider: "password",
      expirationTime: "",
      issuedAtTime: "",
      claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
    phoneNumber: null,
    photoURL: null,
    providerId: "password",
  } as AuthUser
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingEmulators, setIsUsingEmulators] = useState(false)
  const [emulatorStatus, setEmulatorStatus] = useState<"connected" | "disconnected" | "unknown">("unknown")
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Function to switch to demo mode
  const switchToDemoMode = () => {
    setIsDemoMode(true)
    setUser(createDemoUser())
    setLoading(false)
    setError(null)

    // Store demo mode preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("resume-screener-demo-mode", "true")
    }
  }

  // Check if emulators are configured and if we should use demo mode from localStorage
  useEffect(() => {
    const isConfigured = areEmulatorsConfigured()
    setIsUsingEmulators(isConfigured)

    // Check if user previously used demo mode
    if (typeof window !== "undefined") {
      const storedDemoMode = localStorage.getItem("resume-screener-demo-mode") === "true"
      if (storedDemoMode) {
        switchToDemoMode()
      }
    }
  }, [])

  // Handle auth state changes and network errors
  useEffect(() => {
    // Skip Firebase connection if we're in demo mode
    if (isDemoMode) {
      setLoading(false)
      return () => {}
    }

    let unsubscribe = () => {}
    let authInitialized = false

    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          authInitialized = true
          if (user) {
            // You would typically fetch additional user data from Firestore here
            // For now, we'll just set a default role
            const authUser = user as AuthUser
            authUser.role = "recruiter" // Default role
            setUser(authUser)

            // If we successfully get a user, emulators are connected (if configured)
            if (isUsingEmulators) {
              setEmulatorStatus("connected")
            }
          } else {
            setUser(null)
          }
          setLoading(false)
        },
        (error) => {
          console.error("Auth state change error:", error)
          authInitialized = true

          // If we get a network error and emulators are configured,
          // they're probably not running
          if (error.code === "auth/network-request-failed") {
            console.warn("Network request failed. Firebase may be unavailable or emulators not running.")
            setEmulatorStatus("disconnected")
            setError("Network connection failed. Firebase may be unavailable or emulators not running.")

            if (process.env.NODE_ENV === "development") {
              console.warn("Switching to demo mode due to network issues.")
              switchToDemoMode()
            }
          } else {
            setError(error.message)
          }

          setLoading(false)
        },
      )

      // Set a timeout to check if Firebase initialized
      const timeoutId = setTimeout(() => {
        if (!authInitialized) {
          console.warn("Firebase authentication initialization timed out")
          setError("Firebase authentication initialization timed out. Using demo mode instead.")
          switchToDemoMode()
        }
      }, 5000) // 5 second timeout

      return () => {
        clearTimeout(timeoutId)
        unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up auth state listener:", error)
      setError(error instanceof Error ? error.message : "Authentication error")
      setLoading(false)

      if (process.env.NODE_ENV === "development") {
        switchToDemoMode()
      }

      return () => {}
    }
  }, [isDemoMode, isUsingEmulators])

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setError(null)

    // If in demo mode, simulate successful signup
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setUser(createDemoUser(name, email, role))
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      // You would typically store additional user data in Firestore here
      // including the role
    } catch (error) {
      console.error("Error signing up:", error)
      const authError = error as AuthError

      // Handle network errors specifically
      if (authError.code === "auth/network-request-failed") {
        if (isUsingEmulators) {
          setError(
            "Could not connect to Firebase emulators. Make sure they are running with 'firebase emulators:start'",
          )
          setEmulatorStatus("disconnected")

          if (process.env.NODE_ENV === "development") {
            console.warn("Switching to demo mode due to emulator connection issues.")
            switchToDemoMode()
            return // Return early to avoid throwing the error
          }
        } else {
          setError("Network connection failed. Please check your internet connection and try again.")

          // Offer to switch to demo mode
          if (process.env.NODE_ENV === "development") {
            switchToDemoMode()
            return // Return early to avoid throwing the error
          }
        }
      } else {
        setError(authError.message || "Failed to sign up")
      }

      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    setError(null)

    // If in demo mode, simulate successful login
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setUser(createDemoUser("Demo User", email, "recruiter"))
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      const authError = error as AuthError

      // Handle network errors specifically
      if (authError.code === "auth/network-request-failed") {
        if (isUsingEmulators) {
          setError(
            "Could not connect to Firebase emulators. Make sure they are running with 'firebase emulators:start'",
          )
          setEmulatorStatus("disconnected")

          if (process.env.NODE_ENV === "development") {
            console.warn("Switching to demo mode due to emulator connection issues.")
            switchToDemoMode()
            return // Return early to avoid throwing the error
          }
        } else {
          setError("Network connection failed. Please check your internet connection and try again.")

          // Offer to switch to demo mode
          if (process.env.NODE_ENV === "development") {
            switchToDemoMode()
            return // Return early to avoid throwing the error
          }
        }
      } else {
        setError(authError.message || "Failed to sign in")
      }

      throw error
    }
  }

  const logout = async () => {
    setError(null)

    // If in demo mode, simulate logout
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
      setUser(null)

      // Remove demo mode preference from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("resume-screener-demo-mode")
      }

      setIsDemoMode(false)
      return
    }

    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      const authError = error as AuthError
      setError(authError.message || "Failed to sign out")
      throw error
    }
  }

  // Use useMemo to create the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: isDemoMode && !user ? createDemoUser() : user,
      loading,
      error,
      signUp,
      signIn,
      logout,
      isUsingEmulators,
      emulatorStatus,
      isDemoMode,
      switchToDemoMode,
    }),
    [user, loading, error, isUsingEmulators, emulatorStatus, isDemoMode],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

