"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  AlertTriangle,
  Database,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useThemeFix } from "@/hooks/use-theme-fix"

interface SidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: SidebarProps) {
  const { logout, isUsingEmulators, emulatorStatus, isDemoMode } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  useThemeFix()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/dashboard/jobs",
      icon: Briefcase,
    },
    {
      name: "Candidates",
      href: "/dashboard/candidates",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 transition-transform md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold text-gradient-brand">HireSight</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              // This ensures only the most specific match is highlighted
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" // Exact match only for dashboard
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white",
                    item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                  )}
                  aria-disabled={item.disabled}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive && "text-brand-400")} />
                  {item.name}
                  {item.disabled && <span className="ml-2 text-xs bg-gray-800 px-1.5 py-0.5 rounded-full">Soon</span>}
                </Link>
              )
            })}
          </nav>

          <div className="space-y-2 pt-4">
            {isDemoMode && (
              <div className="mb-2 rounded-md bg-blue-900/30 border border-blue-800 p-2">
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300">Demo Mode Active</span>
                </div>
              </div>
            )}

            {isUsingEmulators && emulatorStatus === "disconnected" && !isDemoMode && (
              <div className="mb-2 rounded-md bg-amber-900/30 border border-amber-800 p-2">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-amber-400" />
                  <span className="text-xs font-medium text-amber-300">Emulators Disconnected</span>
                </div>
              </div>
            )}

            {isUsingEmulators && emulatorStatus === "connected" && !isDemoMode && (
              <div className="mb-2 rounded-md bg-green-900/30 border border-green-800 p-2">
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4 text-green-400" />
                  <span className="text-xs font-medium text-green-300">Using Firebase Emulators</span>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start hover:bg-gray-800/50"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="mr-3 h-5 w-5 text-amber-400" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-3 h-5 w-5 text-blue-400" />
                  Dark Mode
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

