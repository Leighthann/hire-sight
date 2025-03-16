"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "job",
    title: "New job match",
    description: "Your profile matches a new Senior Developer position",
    time: "5 minutes ago",
    read: false,
    actionUrl: "/dashboard/jobs/123",
    actionLabel: "View Job",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    type: "message",
    title: "Message from Sarah Johnson",
    description: "I'd like to schedule an interview with you",
    time: "1 hour ago",
    read: false,
    actionUrl: "/dashboard/messages/456",
    actionLabel: "Reply",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    type: "system",
    title: "Profile update required",
    description: "Please update your skills to improve matching",
    time: "1 day ago",
    read: true,
    actionUrl: "/dashboard/profile",
    actionLabel: "Update Profile",
    image: null,
  },
  {
    id: "4",
    type: "job",
    title: "Application status update",
    description: "Your application for Product Manager has been reviewed",
    time: "2 days ago",
    read: true,
    actionUrl: "/dashboard/applications/789",
    actionLabel: "View Status",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    type: "message",
    title: "Message from Recruiting Team",
    description: "Thank you for your application to our company",
    time: "3 days ago",
    read: true,
    actionUrl: "/dashboard/messages/101",
    actionLabel: "Read Message",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-500 text-white"
              variant="default"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96 bg-gray-900 border border-gray-800">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="text-lg font-semibold text-white p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-gray-800 px-4">
            <TabsList className="bg-gray-800/50 border border-gray-700 h-9">
              <TabsTrigger
                value="all"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="job"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Jobs
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                System
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[300px] p-4">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="rounded-full bg-gray-800 p-3 mb-3">
                  <Bell className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">No notifications to display</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-colors",
                      notification.read
                        ? "bg-gray-800/30"
                        : "bg-gradient-to-r from-brand-500/10 to-blue-500/10 border border-blue-900/50",
                    )}
                  >
                    {notification.image ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.image} alt="" />
                        <AvatarFallback className="bg-gray-700">{notification.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className={cn("text-sm font-medium", notification.read ? "text-gray-200" : "text-white")}>
                          {notification.title}
                        </p>
                        {!notification.read && <Badge className="h-2 w-2 rounded-full p-0 bg-brand-500" />}
                      </div>
                      <p className="text-xs text-gray-400">{notification.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <p className="text-xs text-gray-500">{notification.time}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs text-blue-400 hover:text-blue-300"
                          onClick={() => {
                            markAsRead(notification.id)
                            setIsOpen(false)
                          }}
                          asChild
                        >
                          <a href={notification.actionUrl}>{notification.actionLabel}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Tabs>

        <DropdownMenuSeparator className="bg-gray-800" />

        <div className="p-2">
          <DropdownMenuItem asChild>
            <a
              href="/dashboard/settings/notifications"
              className="flex items-center justify-center w-full text-sm text-gray-300 hover:text-white"
            >
              Notification Settings
            </a>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

