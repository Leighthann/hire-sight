"use client"

import { useEffect, useState } from "react"
import { areEmulatorsConfigured } from "@/lib/firebase"

export function useEmulators() {
  const [isUsingEmulators, setIsUsingEmulators] = useState(false)

  useEffect(() => {
    // Check if emulators are configured
    const configured = areEmulatorsConfigured()
    setIsUsingEmulators(configured)
  }, [])

  return { isUsingEmulators }
}

