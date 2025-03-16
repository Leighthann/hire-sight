"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  MessageSquare,
  MoreHorizontal,
  PieChart,
  User,
  X,
  ChevronRight,
  CheckCheck,
  BarChart3,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for applications
const mockApplications = [
  {
    id: "app-1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    status: "applied",
    date: "2023-11-28",
    lastActivity: "2023-11-28",
    hasUnread: true,
    interviews: [],
    timeline: [{ date: "2023-11-28", event: "Application submitted", icon: "FileText" }],
  },
  {
    id: "app-2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=40&width=40",
    status: "screening",
    date: "2023-11-20",
    lastActivity: "2023-11-25",
    hasUnread: false,
    interviews: [],
    timeline: [
      { date: "2023-11-20", event: "Application submitted", icon: "FileText" },
      { date: "2023-11-25", event: "Resume screening in progress", icon: "User" },
    ],
  },
  {
    id: "app-3",
    jobTitle: "React Native Developer",
    company: "MobileApps Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    status: "interview",
    date: "2023-11-15",
    lastActivity: "2023-11-26",
    hasUnread: true,
    interviews: [
      {
        id: "int-1",
        type: "phone",
        date: "2023-12-05",
        time: "10:00 AM",
        duration: 30,
        with: "HR Manager",
      },
    ],
    timeline: [
      { date: "2023-11-15", event: "Application submitted", icon: "FileText" },
      { date: "2023-11-20", event: "Resume screening completed", icon: "CheckCircle" },
      { date: "2023-11-26", event: "Interview scheduled", icon: "Calendar" },
    ],
  },
  {
    id: "app-4",
    jobTitle: "UX/UI Designer",
    company: "DesignHub Co.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    status: "offer",
    date: "2023-11-10",
    lastActivity: "2023-11-27",
    hasUnread: true,
    interviews: [
      {
        id: "int-2",
        type: "video",
        date: "2023-11-18",
        time: "2:00 PM",
        duration: 60,
        with: "Design Team Lead",
        completed: true,
      },
      {
        id: "int-3",
        type: "onsite",
        date: "2023-11-25",
        time: "11:00 AM",
        duration: 120,
        with: "Design Team & CEO",
        completed: true,
      },
    ],
    timeline: [
      { date: "2023-11-10", event: "Application submitted", icon: "FileText" },
      { date: "2023-11-12", event: "Resume screening completed", icon: "CheckCircle" },
      { date: "2023-11-18", event: "First interview completed", icon: "CheckCircle" },
      { date: "2023-11-25", event: "Final interview completed", icon: "CheckCircle" },
      { date: "2023-11-27", event: "Offer received", icon: "CheckCheck" },
    ],
  },
  {
    id: "app-5",
    jobTitle: "DevOps Engineer",
    company: "CloudTech Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    status: "rejected",
    date: "2023-11-05",
    lastActivity: "2023-11-15",
    hasUnread: false,
    interviews: [
      {
        id: "int-4",
        type: "video",
        date: "2023-11-12",
        time: "3:30 PM",
        duration: 45,
        with: "Technical Lead",
        completed: true,
      },
    ],
    timeline: [
      { date: "2023-11-05", event: "Application submitted", icon: "FileText" },
      { date: "2023-11-08", event: "Resume screening completed", icon: "CheckCircle" },
      { date: "2023-11-12", event: "Interview completed", icon: "CheckCircle" },
      { date: "2023-11-15", event: "Application rejected", icon: "X" },
    ],
  },
]

// Mock data for notifications
const mockNotifications = [
  {
    id: "notif-1",
    applicationId: "app-3",
    type: "interview",
    message: "Interview scheduled for React Native Developer position",
    date: "2023-11-26",
    read: false,
  },
  {
    id: "notif-2",
    applicationId: "app-4",
    type: "offer",
    message: "You've received an offer for UX/UI Designer position",
    date: "2023-11-27",
    read: false,
  },
  {
    id: "notif-3",
    applicationId: "app-2",
    type: "status",
    message: "Your application for Full Stack Engineer is now in screening",
    date: "2023-11-25",
    read: true,
  },
  {
    id: "notif-4",
    applicationId: "app-5",
    type: "rejected",
    message: "Your application for DevOps Engineer was not selected",
    date: "2023-11-15",
    read: true,
  },
]

// Mock data for analytics
const mockAnalytics = {
  totalApplications: 12,
  activeApplications: 8,
  interviewRate: 50,
  offerRate: 25,
  responseTime: 4.2, // days
  byStatus: [
    { status: "applied", count: 3 },
    { status: "screening", count: 2 },
    { status: "interview", count: 2 },
    { status: "offer", count: 1 },
    { status: "rejected", count: 4 },
  ],
  byWeek: [
    { week: "Nov 1-7", count: 3 },
    { week: "Nov 8-14", count: 2 },
    { week: "Nov 15-21", count: 4 },
    { week: "Nov 22-28", count: 3 },
  ],
}

export function ApplicationTrackingDashboard() {
  const [applications, setApplications] = useState(mockApplications)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "screening":
        return "Screening"
      case "interview":
        return "Interview"
      case "offer":
        return "Offer"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-900/30 text-blue-400 border-blue-800"
      case "screening":
        return "bg-purple-900/30 text-purple-400 border-purple-800"
      case "interview":
        return "bg-amber-900/30 text-amber-400 border-amber-800"
      case "offer":
        return "bg-green-900/30 text-green-400 border-green-800"
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-800"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-800"
    }
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "applied":
        return 20
      case "screening":
        return 40
      case "interview":
        return 60
      case "offer":
        return 80
      case "rejected":
        return 100
      default:
        return 0
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "interview":
        return <Calendar className="h-4 w-4 text-amber-400" />
      case "offer":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "status":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <X className="h-4 w-4 text-red-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const getTimelineIcon = (icon: string) => {
    switch (icon) {
      case "FileText":
        return <FileText className="h-4 w-4" />
      case "User":
        return <User className="h-4 w-4" />
      case "CheckCircle":
        return <CheckCircle className="h-4 w-4" />
      case "Calendar":
        return <Calendar className="h-4 w-4" />
      case "X":
        return <X className="h-4 w-4" />
      case "CheckCheck":
        return <CheckCheck className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredApplications =
    activeTab === "all" ? applications : applications.filter((app) => app.status === activeTab)

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(notifications.map((notif) => (notif.id === notifId ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Application Tracking
              </CardTitle>
              <CardDescription className="text-gray-400">Track and manage your job applications</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-gray-700 bg-gray-800/50 hover:bg-gray-800">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                  <DropdownMenuLabel>Filter Applications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="focus:bg-gray-800">Most Recent</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800">Oldest First</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800">Company (A-Z)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-700 bg-gray-800/50 hover:bg-gray-800 relative"
                  >
                    <Bell className="h-4 w-4 text-gray-400" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700 w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  {notifications.length === 0 ? (
                    <div className="py-4 text-center text-sm text-gray-500">No notifications</div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map((notif) => (
                        <DropdownMenuItem
                          key={notif.id}
                          className={cn("flex items-start p-3 focus:bg-gray-800", !notif.read && "bg-gray-800/50")}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className="mr-2 mt-0.5">{getNotificationIcon(notif.type)}</div>
                          <div className="flex-1">
                            <p className={cn("text-sm", notif.read ? "text-gray-300" : "text-white font-medium")}>
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(notif.date).toLocaleDateString()}</p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-400 mb-1">Applied</p>
                <p className="text-2xl font-bold text-blue-400">
                  {applications.filter((app) => app.status === "applied").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-400 mb-1">Screening</p>
                <p className="text-2xl font-bold text-purple-400">
                  {applications.filter((app) => app.status === "screening").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-400 mb-1">Interview</p>
                <p className="text-2xl font-bold text-amber-400">
                  {applications.filter((app) => app.status === "interview").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-400 mb-1">Offer</p>
                <p className="text-2xl font-bold text-green-400">
                  {applications.filter((app) => app.status === "offer").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-400 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-400">
                  {applications.filter((app) => app.status === "rejected").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Application List */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="applied"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                Applied
              </TabsTrigger>
              <TabsTrigger
                value="screening"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                Screening
              </TabsTrigger>
              <TabsTrigger
                value="interview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                Interview
              </TabsTrigger>
              <TabsTrigger
                value="offer"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                Offer
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
              >
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-800 p-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">No applications found</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {activeTab === "all"
                      ? "You haven't applied to any jobs yet."
                      : `You don't have any applications in the ${getStatusLabel(activeTab).toLowerCase()} stage.`}
                  </p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    asChild
                  >
                    <a href="/candidate/jobs">Browse Jobs</a>
                  </Button>
                </div>
              ) : (
                filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className={cn(
                      "rounded-lg border bg-gray-800/30 overflow-hidden transition-all duration-200",
                      selectedApplication === app.id ? "border-blue-700" : "border-gray-700",
                      "hover:border-blue-700/50 cursor-pointer",
                    )}
                    onClick={() => setSelectedApplication(selectedApplication === app.id ? null : app.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                            <AvatarImage src={app.companyLogo} alt={app.company} />
                            <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                              {app.company.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-white">{app.jobTitle}</h3>
                            <p className="text-sm text-gray-400">{app.company}</p>
                            <div className="flex items-center mt-1 space-x-2">
                              <Badge variant="outline" className={getStatusColor(app.status)}>
                                {getStatusLabel(app.status)}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Applied on {new Date(app.date).toLocaleDateString()}
                              </span>
                              {app.hasUnread && <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 text-gray-400 transition-transform",
                              selectedApplication === app.id && "rotate-90",
                            )}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress
                          value={getStatusProgress(app.status)}
                          className="h-1.5 bg-gray-700"
                          indicatorClassName={cn(
                            app.status === "rejected" ? "bg-red-500" : "bg-gradient-to-r from-blue-500 to-indigo-500",
                          )}
                        />
                      </div>

                      {selectedApplication === app.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Timeline */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-3">Application Timeline</h4>
                              <div className="space-y-4">
                                {app.timeline.map((event, index) => (
                                  <div key={index} className="relative pl-6">
                                    {index !== app.timeline.length - 1 && (
                                      <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-700" />
                                    )}
                                    <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                                      {getTimelineIcon(event.icon)}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-white">{event.event}</p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(event.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Upcoming Interviews */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-3">
                                {app.interviews.filter((i) => !i.completed).length > 0
                                  ? "Upcoming Interviews"
                                  : app.interviews.filter((i) => i.completed).length > 0
                                    ? "Past Interviews"
                                    : "No Interviews Scheduled"}
                              </h4>

                              {app.interviews.length > 0 ? (
                                <div className="space-y-3">
                                  {app.interviews
                                    .filter((i) => !i.completed)
                                    .map((interview) => (
                                      <Card key={interview.id} className="bg-gray-800/50 border-gray-700">
                                        <CardContent className="p-3">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <div className="flex items-center space-x-2">
                                                <Badge
                                                  variant="outline"
                                                  className="bg-amber-900/30 text-amber-400 border-amber-800"
                                                >
                                                  {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                                                </Badge>
                                                <span className="text-xs text-gray-400">with {interview.with}</span>
                                              </div>
                                              <p className="text-sm font-medium text-white mt-1">
                                                {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                              </p>
                                              <p className="text-xs text-gray-500">{interview.duration} minutes</p>
                                            </div>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="border-gray-700 hover:bg-gray-700"
                                            >
                                              Prepare
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}

                                  {app.interviews
                                    .filter((i) => i.completed)
                                    .map((interview) => (
                                      <Card key={interview.id} className="bg-gray-800/50 border-gray-700 opacity-75">
                                        <CardContent className="p-3">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <div className="flex items-center space-x-2">
                                                <Badge
                                                  variant="outline"
                                                  className="bg-gray-800 text-gray-400 border-gray-700"
                                                >
                                                  {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                                                </Badge>
                                                <span className="text-xs text-gray-500">with {interview.with}</span>
                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                              </div>
                                              <p className="text-sm text-gray-400 mt-1">
                                                {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                              </p>
                                            </div>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="border-gray-700 hover:bg-gray-700"
                                            >
                                              View Notes
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center bg-gray-800/30 rounded-lg border border-gray-700">
                                  <Calendar className="h-8 w-8 text-gray-500 mb-2" />
                                  <p className="text-sm text-gray-400">No interviews scheduled yet</p>
                                  {app.status !== "rejected" && app.status !== "applied" && (
                                    <Button
                                      variant="link"
                                      className="text-blue-400 hover:text-blue-300 mt-1 h-auto p-0"
                                    >
                                      Send follow-up
                                    </Button>
                                  )}
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center justify-between mt-4">
                                <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Messages
                                </Button>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-gray-900 border-gray-700">
                                    <DropdownMenuItem className="focus:bg-gray-800">View Job Details</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-gray-800">Set Reminder</DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    <DropdownMenuItem className="focus:bg-gray-800 text-red-400">
                                      Withdraw Application
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Analytics */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Application Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Interview Rate</span>
                    <span className="text-sm font-medium text-white">{mockAnalytics.interviewRate}%</span>
                  </div>
                  <Progress value={mockAnalytics.interviewRate} className="h-1.5 bg-gray-700" />

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-400">Offer Rate</span>
                    <span className="text-sm font-medium text-white">{mockAnalytics.offerRate}%</span>
                  </div>
                  <Progress value={mockAnalytics.offerRate} className="h-1.5 bg-gray-700" />

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-400">Avg. Response Time</span>
                    <span className="text-sm font-medium text-white">{mockAnalytics.responseTime} days</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <PieChart className="h-12 w-12 text-blue-400 mb-2" />
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Applications by Status</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {mockAnalytics.byStatus.map((item) => (
                        <Badge key={item.status} variant="outline" className={getStatusColor(item.status)}>
                          {item.count} {getStatusLabel(item.status)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-blue-400 mb-2" />
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Applications by Week</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {mockAnalytics.byWeek.map((item, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-800">
                          {item.count} ({item.week})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

