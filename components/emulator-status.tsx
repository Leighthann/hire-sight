"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth-context"

export function EmulatorStatus() {
  const { isUsingEmulators, emulatorStatus, isDemoMode } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  let badgeVariant: "default" | "outline" | "destructive" | "secondary" = "outline"
  let badgeText = "Firebase: Production"
  let tooltipText = "Using production Firebase. Set NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true to use emulators."

  if (isDemoMode) {
    badgeVariant = "secondary"
    badgeText = "Firebase: Demo Mode"
    tooltipText = "Using demo mode with mock data. No connection to Firebase."
  } else if (isUsingEmulators) {
    if (emulatorStatus === "connected") {
      badgeVariant = "default"
      badgeText = "Firebase Emulators: Connected"
      tooltipText = "Using local Firebase emulators. No data will be sent to production."
    } else if (emulatorStatus === "disconnected") {
      badgeVariant = "destructive"
      badgeText = "Firebase Emulators: Disconnected"
      tooltipText = "Emulators are enabled but not responding. Run 'firebase emulators:start' in your terminal."
    } else {
      badgeVariant = "secondary"
      badgeText = "Firebase Emulators: Checking..."
      tooltipText = "Checking connection to Firebase emulators..."
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-4 right-4 z-50">
            <Badge variant={badgeVariant} className="cursor-help">
              {badgeText}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{tooltipText}</p>
          {isUsingEmulators && emulatorStatus === "disconnected" && (
            <p className="mt-2 text-xs">
              Run <code className="bg-muted p-1 rounded">firebase emulators:start</code> or{" "}
              <code className="bg-muted p-1 rounded">npm run emulators</code>
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

