"use client"

import { useState, useEffect } from "react"
import { Laptop, Smartphone, Tablet, RefreshCw, Check, AlertTriangle, LogOut, Clock, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export function CrossPlatformSync() {
  const { toast } = useToast()
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(new Date())
  const [syncProgress, setSyncProgress] = useState(100)
  const [offlineMode, setOfflineMode] = useState(false)
  const [activeSessions, setActiveSessions] = useState([
    {
      id: "1",
      device: "Chrome on Windows",
      type: "desktop",
      lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      location: "New York, USA",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      type: "mobile",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      location: "New York, USA",
      current: false,
    },
    {
      id: "3",
      device: "Firefox on MacBook",
      type: "desktop",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      location: "Boston, USA",
      current: false,
    },
  ])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return "Just now"
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
    if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`

    return date.toLocaleDateString()
  }

  // Simulate sync process
  const syncData = async () => {
    if (!isOnline && !offlineMode) {
      toast({
        title: "Sync Failed",
        description: "You are currently offline. Enable offline mode to continue working.",
        variant: "destructive",
      })
      return
    }

    setIsSyncing(true)
    setSyncProgress(0)

    try {
      // Simulate sync progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setSyncProgress(i)
      }

      setLastSynced(new Date())

      toast({
        title: "Sync Complete",
        description: "Your data has been successfully synchronized.",
      })
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "There was an error synchronizing your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
      setSyncProgress(100)
    }
  }

  // Toggle offline mode
  const toggleOfflineMode = (checked: boolean) => {
    setOfflineMode(checked)

    toast({
      title: checked ? "Offline Mode Enabled" : "Offline Mode Disabled",
      description: checked
        ? "You can continue working offline. Changes will sync when you reconnect."
        : "Your device will sync automatically when online.",
    })
  }

  // End a session
  const endSession = (sessionId: string) => {
    setActiveSessions(activeSessions.filter((session) => session.id !== sessionId))

    toast({
      title: "Session Ended",
      description: "The selected session has been terminated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">Device Synchronization</h1>
        <p className="text-gray-400">Manage your devices and synchronization settings</p>
      </div>

      {/* Sync Status Card */}
      <Card className={cn("bg-gradient-card glow-effect", !isOnline && !offlineMode && "border-amber-800")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gradient-brand">Sync Status</CardTitle>
            <Badge
              variant={isOnline ? "default" : "outline"}
              className={cn(
                "px-2 py-0 h-6",
                isOnline
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                  : "border-amber-800 text-amber-400",
              )}
            >
              {isOnline ? (
                <div className="flex items-center">
                  <Wifi className="mr-1 h-3 w-3" />
                  Online
                </div>
              ) : (
                <div className="flex items-center">
                  <WifiOff className="mr-1 h-3 w-3" />
                  Offline
                </div>
              )}
            </Badge>
          </div>
          <CardDescription className="text-gray-400">
            {isOnline
              ? "Your data is being synchronized across all your devices"
              : "You are currently offline. Enable offline mode to continue working."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isSyncing ? (
                  <RefreshCw className="mr-2 h-5 w-5 text-blue-400 animate-spin" />
                ) : syncProgress === 100 ? (
                  <Check className="mr-2 h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {isSyncing ? "Syncing..." : syncProgress === 100 ? "Fully Synced" : "Sync Incomplete"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {lastSynced ? `Last synced: ${formatRelativeTime(lastSynced)}` : "Never synced"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={syncData}
                disabled={isSyncing || (!isOnline && !offlineMode)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <RefreshCw className={cn("mr-2 h-4 w-4", isSyncing && "animate-spin")} />
                {isSyncing ? "Syncing..." : "Sync Now"}
              </Button>
            </div>

            {isSyncing && (
              <Progress
                value={syncProgress}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-gradient-to-r from-brand-500 to-blue-500"
              />
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="offlineMode" checked={offlineMode} onCheckedChange={toggleOfflineMode} />
                <Label htmlFor="offlineMode" className="text-gray-200">
                  Offline Mode
                </Label>
              </div>
              <span className="text-xs text-gray-400">
                {offlineMode ? "Changes will sync when you reconnect" : "Automatic sync when online"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Switcher */}
      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Platform Switcher</CardTitle>
          <CardDescription className="text-gray-400">Switch between different platforms and devices</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-800"
          >
            <Laptop className="h-8 w-8 mb-2 text-blue-400" />
            <span className="text-sm">Web App</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-800"
          >
            <Smartphone className="h-8 w-8 mb-2 text-blue-400" />
            <span className="text-sm">Mobile App</span>
            <Badge className="mt-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:text-blue-400">
              Available
            </Badge>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-800"
          >
            <Tablet className="h-8 w-8 mb-2 text-blue-400" />
            <span className="text-sm">Tablet App</span>
            <Badge variant="outline" className="mt-1 border-gray-700 text-gray-400">
              Coming Soon
            </Badge>
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Active Sessions</CardTitle>
          <CardDescription className="text-gray-400">Manage your active sessions across devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                session.current ? "bg-blue-900/20 border-blue-800" : "bg-gray-800/30 border-gray-800",
              )}
            >
              <div className="flex items-center space-x-3">
                {session.type === "desktop" ? (
                  <Laptop className="h-8 w-8 text-blue-400" />
                ) : session.type === "mobile" ? (
                  <Smartphone className="h-8 w-8 text-blue-400" />
                ) : (
                  <Tablet className="h-8 w-8 text-blue-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {session.device}
                    {session.current && (
                      <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-400">
                        Current
                      </Badge>
                    )}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatRelativeTime(session.lastActive)}
                    <span className="mx-1">•</span>
                    {session.location}
                  </div>
                </div>
              </div>
              {!session.current && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      End Session
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">End Session</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This will log out the device from your account. Are you sure you want to continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => endSession(session.id)}
                        className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300"
                      >
                        End Session
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-gray-700 text-red-400 hover:bg-red-900/20 hover:text-red-300"
          >
            <LogOut className="mr-2 h-4 w-4" />
            End All Other Sessions
          </Button>
        </CardFooter>
      </Card>

      {/* Offline Capabilities */}
      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Offline Capabilities</CardTitle>
          <CardDescription className="text-gray-400">
            Manage what features are available when working offline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="offlineResumes" className="text-gray-200">
                Resume Viewing
              </Label>
              <p className="text-xs text-gray-400 mt-1">View previously loaded resumes while offline</p>
            </div>
            <Switch id="offlineResumes" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="offlineJobs" className="text-gray-200">
                Job Listings
              </Label>
              <p className="text-xs text-gray-400 mt-1">Access cached job listings while offline</p>
            </div>
            <Switch id="offlineJobs" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="offlineApplications" className="text-gray-200">
                Application Drafts
              </Label>
              <p className="text-xs text-gray-400 mt-1">Create and edit application drafts while offline</p>
            </div>
            <Switch id="offlineApplications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="offlineNotes" className="text-gray-200">
                Notes & Annotations
              </Label>
              <p className="text-xs text-gray-400 mt-1">Create and edit notes while offline</p>
            </div>
            <Switch id="offlineNotes" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="offlineAnalytics" className="text-gray-200">
                Analytics & Reports
              </Label>
              <p className="text-xs text-gray-400 mt-1">Access cached analytics data while offline</p>
            </div>
            <Switch id="offlineAnalytics" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

