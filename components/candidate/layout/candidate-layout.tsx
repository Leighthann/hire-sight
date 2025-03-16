"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  ClipboardList,
  User,
  ChevronDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { NotificationCenter } from "@/components/navigation/notification-center"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CandidateLayoutProps {
  children: React.ReactNode
}

export function CandidateLayout({ children }: CandidateLayoutProps) {
  const { logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [queueCount, setQueueCount] = useState(0)

  // Fetch the queue count from local storage or API
  useEffect(() => {
    // For demo purposes, we'll use mock data
    // In a real app, this would come from an API or state management
    const mockCartItems = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        salary: "$120,000 - $150,000",
        matchScore: 95,
        coverLetter: "",
        selected: true,
      },
      {
        id: "3",
        title: "Full Stack Developer",
        company: "InnovateTech",
        location: "New York, NY",
        salary: "$130,000 - $160,000",
        matchScore: 82,
        coverLetter: "",
        selected: true,
      },
      {
        id: "5",
        title: "React Native Developer",
        company: "MobileApps Inc.",
        location: "Remote",
        salary: "$110,000 - $140,000",
        matchScore: 75,
        coverLetter: "",
        selected: true,
      },
    ]

    setQueueCount(mockCartItems.length)
  }, [])

  const navItems = [
    {
      name: "Dashboard",
      href: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      href: "/candidate/profile",
      icon: User,
    },
    {
      name: "Resume",
      href: "/candidate/resume",
      icon: FileText,
    },
    {
      name: "Job Recommendations",
      href: "/candidate/jobs",
      icon: Briefcase,
    },
    {
      name: "Settings",
      href: "/candidate/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 md:flex-row">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

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
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link href="/candidate/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold text-gradient-brand">HireSight</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/candidate/dashboard"
                  ? pathname === "/candidate/dashboard"
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
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive && "text-brand-400")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="space-y-2 pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
              onClick={() => {
                try {
                  logout()
                } catch (error) {
                  console.error("Logout failed:", error)
                }
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 relative z-10">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm px-4 md:px-6">
          <NotificationCenter />

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/candidate/queue">
              <ClipboardList className="h-5 w-5" />
              <span className="sr-only">Application Queue</span>
              {queueCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 bg-brand-500 text-white">
                  {queueCount}
                </Badge>
              )}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-gray-800/50 border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-brand-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  JS
                </div>
                <span className="hidden sm:inline">John Smith</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-gray-200">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-400">john.smith@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-800 focus:text-white">
                <Link href="/candidate/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-800 focus:text-white">
                <Link href="/candidate/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="cursor-pointer text-red-400 focus:bg-red-900/20 focus:text-red-300"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</main>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

