"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  CalendarDays,
  Clock,
  Video,
  Phone,
  Users,
  MapPin,
  Check,
  FileText,
  Loader2,
  ChevronRight,
  Info,
  Link,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for upcoming interviews
const mockInterviews = [
  {
    id: "int-1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-12-05",
    time: "10:00 AM",
    duration: 30,
    type: "phone",
    with: "HR Manager",
    status: "confirmed",
    notes: "",
    location: null,
    link: null,
    phone: "+1 (555) 123-4567",
    preparationMaterials: [
      { id: "prep-1", title: "Company Overview", type: "pdf" },
      { id: "prep-2", title: "Job Description", type: "pdf" },
      { id: "prep-3", title: "Interview Tips", type: "link" },
    ],
  },
  {
    id: "int-2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-12-10",
    time: "2:00 PM",
    duration: 60,
    type: "video",
    with: "Tech Lead & Senior Engineer",
    status: "confirmed",
    notes: "Prepare to discuss previous projects and technical challenges.",
    location: null,
    link: "https://meet.example.com/interview-123",
    phone: null,
    preparationMaterials: [
      { id: "prep-4", title: "Technical Assessment", type: "pdf" },
      { id: "prep-5", title: "Coding Challenge", type: "link" },
    ],
  },
  {
    id: "int-3",
    jobTitle: "UX/UI Designer",
    company: "DesignHub Co.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-12-15",
    time: "11:00 AM",
    duration: 90,
    type: "onsite",
    with: "Design Team & CEO",
    status: "pending",
    notes: "Bring portfolio and prepare to present past work.",
    location: "123 Design Street, New York, NY 10001",
    link: null,
    phone: null,
    preparationMaterials: [
      { id: "prep-6", title: "Design Brief", type: "pdf" },
      { id: "prep-7", title: "Company Style Guide", type: "pdf" },
    ],
  },
]

// Mock data for available time slots
const mockTimeSlots = [
  { date: "2023-12-20", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
  { date: "2023-12-21", slots: ["9:00 AM", "10:00 AM", "1:00 PM", "4:00 PM"] },
  { date: "2023-12-22", slots: ["10:00 AM", "11:00 AM", "3:00 PM"] },
]

// Mock data for job application
const mockJobApplication = {
  id: "app-1",
  jobTitle: "React Native Developer",
  company: "MobileApps Inc.",
  companyLogo: "/placeholder.svg?height=40&width=40",
  status: "interview_requested",
  recruiterName: "Sarah Johnson",
  recruiterTitle: "Technical Recruiter",
  recruiterAvatar: "/placeholder.svg?height=40&width=40",
  message:
    "We've reviewed your application and would like to schedule an initial phone interview to discuss your experience and the role in more detail.",
}

export function InterviewScheduler() {
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [interviewType, setInterviewType] = useState("phone")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [remindersEnabled, setRemindersEnabled] = useState(true)

  // Filter interviews based on active tab
  const filteredInterviews =
    activeTab === "upcoming"
      ? mockInterviews.filter((int) => new Date(int.date) >= new Date())
      : mockInterviews.filter((int) => new Date(int.date) < new Date())

  // Get available time slots for selected date
  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return []

    const dateString = date.toISOString().split("T")[0]
    const matchingDate = mockTimeSlots.find((ts) => ts.date === dateString)
    return matchingDate ? matchingDate.slots : []
  }

  const availableTimeSlots = getAvailableTimeSlots(selectedDate)

  // Get interview type icon
  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "onsite":
        return <MapPin className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  // Get interview status badge
  const getInterviewStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-900/30 text-amber-400 border-amber-800">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-800">
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-900/30 text-gray-400 border-gray-800">
            {status}
          </Badge>
        )
    }
  }

  // Handle scheduling submission
  const handleScheduleInterview = async () => {
    if (!selectedDate || !selectedTimeSlot || !interviewType) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedDate(undefined)
        setSelectedTimeSlot(null)
        setInterviewType("phone")
        setNotes("")
        setActiveTab("upcoming")
      }, 2000)
    } catch (error) {
      console.error("Error scheduling interview:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Interview Scheduler
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage and schedule your upcoming interviews
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="border-blue-700 bg-blue-900/20 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Sync Calendar
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800/50 border border-gray-700">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Upcoming Interviews
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Past Interviews
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Schedule New
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-4 space-y-4">
                {filteredInterviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-800 p-3">
                      <CalendarDays className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">No upcoming interviews</h3>
                    <p className="mt-2 text-sm text-gray-400">You don't have any upcoming interviews scheduled.</p>
                    <Button
                      className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={() => setActiveTab("schedule")}
                    >
                      Schedule Interview
                    </Button>
                  </div>
                ) : (
                  filteredInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className={cn(
                        "rounded-lg border bg-gray-800/30 overflow-hidden transition-all duration-200",
                        selectedInterview === interview.id ? "border-blue-700" : "border-gray-700",
                        "hover:border-blue-700/50 cursor-pointer",
                      )}
                      onClick={() => setSelectedInterview(selectedInterview === interview.id ? null : interview.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                              <AvatarImage src={interview.companyLogo} alt={interview.company} />
                              <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                                {interview.company.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-white">{interview.jobTitle}</h3>
                              <p className="text-sm text-gray-400">{interview.company}</p>
                              <div className="flex items-center mt-1 space-x-2">
                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                  <CalendarDays className="h-3.5 w-3.5 text-gray-500" />
                                  <span>{new Date(interview.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                                  <span>
                                    {interview.time} ({interview.duration} min)
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                  {getInterviewTypeIcon(interview.type)}
                                  <span>{interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {getInterviewStatusBadge(interview.status)}
                            <ChevronRight
                              className={cn(
                                "h-5 w-5 text-gray-400 transition-transform",
                                selectedInterview === interview.id && "rotate-90",
                              )}
                            />
                          </div>
                        </div>

                        {selectedInterview === interview.id && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-3">Interview Details</h4>
                                <div className="space-y-3">
                                  <div className="flex items-start">
                                    <Users className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                                    <div>
                                      <p className="text-sm text-gray-300">Interviewer(s)</p>
                                      <p className="text-sm text-white">{interview.with}</p>
                                    </div>
                                  </div>

                                  {interview.type === "phone" && interview.phone && (
                                    <div className="flex items-start">
                                      <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-300">Phone Number</p>
                                        <p className="text-sm text-white">{interview.phone}</p>
                                      </div>
                                    </div>
                                  )}

                                  {interview.type === "video" && interview.link && (
                                    <div className="flex items-start">
                                      <Video className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-300">Meeting Link</p>
                                        <a
                                          href={interview.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                                        >
                                          {interview.link.substring(0, 30)}...
                                          <Link className="h-3 w-3 ml-1" />
                                        </a>
                                      </div>
                                    </div>
                                  )}

                                  {interview.type === "onsite" && interview.location && (
                                    <div className="flex items-start">
                                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-300">Location</p>
                                        <p className="text-sm text-white">{interview.location}</p>
                                      </div>
                                    </div>
                                  )}

                                  {interview.notes && (
                                    <div className="flex items-start">
                                      <FileText className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-300">Notes</p>
                                        <p className="text-sm text-white">{interview.notes}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-3">Preparation Materials</h4>
                                {interview.preparationMaterials.length > 0 ? (
                                  <div className="space-y-2">
                                    {interview.preparationMaterials.map((material) => (
                                      <div
                                        key={material.id}
                                        className="flex items-center justify-between p-2 rounded-md border border-gray-700 bg-gray-800/50"
                                      >
                                        <div className="flex items-center">
                                          <FileText className="h-4 w-4 text-blue-400 mr-2" />
                                          <span className="text-sm text-white">{material.title}</span>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                        >
                                          View
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-6 text-center bg-gray-800/30 rounded-lg border border-gray-700">
                                    <FileText className="h-8 w-8 text-gray-500 mb-2" />
                                    <p className="text-sm text-gray-400">No preparation materials available</p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between mt-4">
                                  <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                                    Add to Calendar
                                  </Button>

                                  {interview.status === "confirmed" && (
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 border border-red-800"
                                    >
                                      Reschedule
                                    </Button>
                                  )}
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

              <TabsContent value="past" className="mt-4 space-y-4">
                {filteredInterviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-800 p-3">
                      <CalendarDays className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">No past interviews</h3>
                    <p className="mt-2 text-sm text-gray-400">You don't have any past interviews.</p>
                  </div>
                ) : (
                  <div className="opacity-75">
                    {/* Past interviews would be displayed here with the same structure as upcoming */}
                    <div className="text-center py-4 text-gray-400">No past interviews to display</div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="schedule" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interview Request */}
                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Interview Request</CardTitle>
                      <CardDescription className="text-gray-400">
                        Schedule your interview for the following position
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start space-x-3 mb-4">
                        <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                          <AvatarImage src={mockJobApplication.companyLogo} alt={mockJobApplication.company} />
                          <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                            {mockJobApplication.company.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">{mockJobApplication.jobTitle}</h3>
                          <p className="text-sm text-gray-400">{mockJobApplication.company}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-blue-900/20 border border-blue-800 mb-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage
                              src={mockJobApplication.recruiterAvatar}
                              alt={mockJobApplication.recruiterName}
                            />
                            <AvatarFallback className="bg-blue-800 text-blue-200">
                              {mockJobApplication.recruiterName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">{mockJobApplication.recruiterName}</p>
                            <p className="text-xs text-gray-400">{mockJobApplication.recruiterTitle}</p>
                            <p className="text-sm text-gray-300 mt-2">{mockJobApplication.message}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Select Interview Type</h4>
                          <RadioGroup
                            defaultValue="phone"
                            value={interviewType}
                            onValueChange={setInterviewType}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="phone" className="border-gray-600 text-blue-500" />
                              <Label htmlFor="phone" className="flex items-center text-gray-300">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                Phone Interview
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video" id="video" className="border-gray-600 text-blue-500" />
                              <Label htmlFor="video" className="flex items-center text-gray-300">
                                <Video className="h-4 w-4 mr-2 text-gray-400" />
                                Video Interview
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="onsite" id="onsite" className="border-gray-600 text-blue-500" />
                              <Label htmlFor="onsite" className="flex items-center text-gray-300">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                Onsite Interview
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</h4>
                          <Textarea
                            placeholder="Add any additional information or questions..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="h-24 bg-gray-900 border-gray-700 text-white resize-none focus:border-blue-700 focus:ring-blue-700/20"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id="reminders" checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
                            <Label htmlFor="reminders" className="text-sm text-gray-300">
                              Enable reminders
                            </Label>
                          </div>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Info className="h-4 w-4 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                You'll receive email and browser notifications 24 hours and 1 hour before the interview.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Calendar Selection */}
                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Select Date & Time</CardTitle>
                      <CardDescription className="text-gray-400">Choose from available interview slots</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="border border-gray-700 rounded-md bg-gray-900/50"
                          classNames={{
                            day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
                            day_today: "bg-gray-800 text-white",
                            day: "hover:bg-gray-800 hover:text-white",
                            day_disabled: "text-gray-600",
                            nav_button: "hover:bg-gray-800",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            caption: "flex justify-center py-2 relative items-center",
                            caption_label: "text-sm font-medium text-gray-300",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          }}
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Available Time Slots</h4>
                        {availableTimeSlots.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {availableTimeSlots.map((slot) => (
                              <Button
                                key={slot}
                                variant="outline"
                                size="sm"
                                className={cn(
                                  "border-gray-700 hover:bg-gray-800 hover:text-white",
                                  selectedTimeSlot === slot && "border-blue-700 bg-blue-900/20 text-blue-400",
                                )}
                                onClick={() => setSelectedTimeSlot(slot)}
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center bg-gray-800/30 rounded-lg border border-gray-700">
                            <Clock className="h-8 w-8 text-gray-500 mb-2" />
                            <p className="text-sm text-gray-400">No available time slots for selected date</p>
                            <p className="text-xs text-gray-500 mt-1">Please select another date</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t border-gray-700 pt-4">
                      <Button
                        onClick={handleScheduleInterview}
                        disabled={!selectedDate || !selectedTimeSlot || !interviewType || isSubmitting || isSuccess}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Scheduled Successfully
                          </>
                        ) : (
                          "Schedule Interview"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

