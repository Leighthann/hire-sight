"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  Search,
  Plus,
  ChevronDown,
  Clipboard,
  GraduationCap,
  LineChart,
  MessageSquare,
  User,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationCenter } from "./notification-center"

interface NavigationProps {
  className?: string
}

export function UnifiedNavigation({ className }: NavigationProps) {
  const { user, logout, isDemoMode } = useAuth()
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<"candidate" | "recruiter">("recruiter")
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ label: string; href: string; current?: boolean }>>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Determine user role based on path or user data
  useEffect(() => {
    if (pathname?.includes("/candidate")) {
      setUserRole("candidate")
    } else {
      setUserRole("recruiter")
    }
  }, [pathname])

  // Generate breadcrumbs based on current path
  useEffect(() => {
    if (!pathname) return

    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbItems = pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
      return {
        label,
        href,
        current: index === pathSegments.length - 1,
      }
    })

    setBreadcrumbs(breadcrumbItems)
  }, [pathname])

  // Navigation items based on user role
  const recruiterNavItems = [
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
      name: "Resumes",
      href: "/dashboard/resumes",
      icon: FileText,
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

  const candidateNavItems = [
    {
      name: "Dashboard",
      href: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Job Search",
      href: "/candidate/jobs",
      icon: Briefcase,
    },
    {
      name: "My Profile",
      href: "/candidate/profile",
      icon: User,
    },
    {
      name: "Applications",
      href: "/candidate/applications",
      icon: Clipboard,
    },
    {
      name: "Learning",
      href: "/candidate/learning",
      icon: GraduationCap,
    },
    {
      name: "Insights",
      href: "/candidate/insights",
      icon: LineChart,
    },
    {
      name: "Messages",
      href: "/candidate/messages",
      icon: MessageSquare,
    },
    {
      name: "Settings",
      href: "/candidate/settings",
      icon: Settings,
    },
  ]

  const navItems = userRole === "candidate" ? candidateNavItems : recruiterNavItems

  // Quick actions based on user role
  const recruiterQuickActions = [
    { label: "Post Job", icon: Plus, href: "/dashboard/jobs/new" },
    { label: "Upload Resume", icon: FileText, href: "/dashboard/resumes/upload" },
    { label: "View Candidates", icon: Users, href: "/dashboard/candidates" },
  ]

  const candidateQuickActions = [
    { label: "Apply to Jobs", icon: Briefcase, href: "/candidate/jobs" },
    { label: "Update Resume", icon: FileText, href: "/candidate/profile" },
    { label: "Check Applications", icon: Clipboard, href: "/candidate/applications" },
  ]

  const quickActions = userRole === "candidate" ? candidateQuickActions : recruiterQuickActions

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-gray-900 border-r border-gray-800">
              <div className="flex h-16 items-center border-b border-gray-800 px-6">
                <Link
                  href={userRole === "candidate" ? "/candidate/dashboard" : "/dashboard"}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    H
                  </div>
                  <span className="text-xl font-bold text-gradient-brand">HireSight</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
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
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={cn("mr-3 h-5 w-5", isActive && "text-brand-400")} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href={userRole === "candidate" ? "/candidate/dashboard" : "/dashboard"}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold text-gradient-brand hidden md:inline-block">HireSight</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
            {navItems.length > 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-gray-800">
                  {navItems.slice(4).map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center w-full",
                            isActive && "bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white",
                          )}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className={cn("relative", isSearchOpen ? "w-full md:w-64" : "w-auto")}>
            {isSearchOpen ? (
              <div className="flex items-center w-full">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-gray-800 border-gray-700 text-white"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Quick actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border border-gray-800">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              {quickActions.map((action) => (
                <DropdownMenuItem key={action.label} asChild>
                  <Link href={action.href} className="flex items-center w-full">
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                  <AvatarFallback className="bg-gradient-to-r from-brand-600 to-blue-500 text-white">
                    {user?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border border-gray-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                  <p className="text-xs leading-none text-gray-400">{user?.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem asChild>
                <Link
                  href={userRole === "candidate" ? "/candidate/profile" : "/dashboard/settings"}
                  className="flex items-center w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={userRole === "candidate" ? "/candidate/settings" : "/dashboard/settings"}
                  className="flex items-center w-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              {userRole === "candidate" && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center w-full">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Switch to Recruiter
                  </Link>
                </DropdownMenuItem>
              )}
              {userRole === "recruiter" && (
                <DropdownMenuItem asChild>
                  <Link href="/candidate/dashboard" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Switch to Candidate
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <div className="flex items-center h-10 px-4 md:px-6 border-b border-gray-800 bg-gray-900/50">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={breadcrumb.href}>
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <BreadcrumbLink href={breadcrumb.href} className="text-sm text-gray-400 hover:text-white">
                        {breadcrumb.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <span className="text-sm font-medium text-white">{breadcrumb.label}</span>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </div>
  )
}

