"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemeFix() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Check if the theme is applied correctly
    const htmlElement = document.documentElement
    const hasThemeClass = htmlElement.classList.contains("dark") || htmlElement.classList.contains("light")

    // If the theme class is missing but theme is set, reapply it
    if (!hasThemeClass && theme) {
      setTheme(theme)
    }

    // Force a re-render if the theme doesn't match the class
    if (theme === "dark" && !htmlElement.classList.contains("dark")) {
      setTheme("dark")
    } else if (theme === "light" && htmlElement.classList.contains("dark")) {
      setTheme("light")
    }
  }, [theme, setTheme])
}

