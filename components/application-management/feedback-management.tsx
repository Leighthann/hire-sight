"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Star,
  ChevronDown,
  CheckCircle,
  Lightbulb,
  Filter,
  Loader2,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TooltipProvider } from "@/components/ui/tooltip"

// Mock data for feedback
const mockFeedback = [
  {
    id: "feedback-1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-11-15",
    stage: "interview",
    type: "technical",
    anonymous: true,
    feedback:
      "The candidate demonstrated strong React knowledge and problem-solving skills. However, there were some gaps in understanding of state management patterns and performance optimization techniques.",
    strengths: ["Strong React fundamentals", "Good problem-solving approach", "Clear communication"],
    improvements: [
      "Deepen knowledge of state management libraries",
      "Learn more about React performance optimization",
      "Practice more complex algorithm challenges",
    ],
    rating: 4,
    helpful: null,
  },
  {
    id: "feedback-2",
    jobTitle: "UX/UI Designer",
    company: "DesignHub Co.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-11-10",
    stage: "portfolio",
    type: "design",
    anonymous: false,
    reviewerName: "Sarah Chen",
    reviewerTitle: "Design Director",
    reviewerAvatar: "/placeholder.svg?height=40&width=40",
    feedback:
      "Portfolio shows strong visual design skills and attention to detail. The candidate has a good eye for typography and color. Would benefit from more examples of user research and the design thinking process.",
    strengths: ["Excellent visual design skills", "Strong typography and color usage", "Clean and modern aesthetic"],
    improvements: [
      "Include more examples of user research",
      "Show more of your design process",
      "Add case studies with measurable outcomes",
    ],
    rating: 3,
    helpful: true,
  },
  {
    id: "feedback-3",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=40&width=40",
    date: "2023-10-28",
    stage: "coding_challenge",
    type: "technical",
    anonymous: true,
    feedback:
      "The solution was functional but lacked proper error handling and test coverage. Code structure was good, but there were opportunities to improve performance and security.",
    strengths: ["Functional solution that met requirements", "Good code organization", "Clean API design"],
    improvements: [
      "Implement comprehensive error handling",
      "Add unit and integration tests",
      "Address security vulnerabilities in authentication",
    ],
    rating: 3,
    helpful: false,
  },
]

// Mock data for feedback form
const mockFeedbackForm = {
  id: "form-1",
  jobTitle: "DevOps Engineer",
  company: "CloudTech Solutions",
  companyLogo: "/placeholder.svg?height=40&width=40",
  date: "2023-11-25",
  stage: "technical_interview",
  questions: [
    {
      id: "q1",
      type: "rating",
      question: "How would you rate the candidate's technical knowledge?",
      options: [1, 2, 3, 4, 5],
      answer: null,
    },
    {
      id: "q2",
      type: "rating",
      question: "How would you rate the candidate's communication skills?",
      options: [1, 2, 3, 4, 5],
      answer: null,
    },
    {
      id: "q3",
      type: "text",
      question: "What were the candidate's key strengths?",
      answer: "",
    },
    {
      id: "q4",
      type: "text",
      question: "What areas could the candidate improve on?",
      answer: "",
    },
    {
      id: "q5",
      type: "radio",
      question: "Would you recommend moving forward with this candidate?",
      options: ["Yes, definitely", "Yes, with reservations", "No"],
      answer: null,
    },
  ],
}

// Mock data for feedback analytics
const mockAnalytics = {
  totalFeedback: 12,
  averageRating: 3.7,
  byStage: [
    { stage: "resume_screening", count: 4, avgRating: 3.2 },
    { stage: "phone_interview", count: 3, avgRating: 3.5 },
    { stage: "technical_interview", count: 3, avgRating: 4.0 },
    { stage: "final_interview", count: 2, avgRating: 4.2 },
  ],
  topStrengths: [
    { strength: "Technical knowledge", count: 8 },
    { strength: "Communication", count: 7 },
    { strength: "Problem solving", count: 6 },
    { strength: "Teamwork", count: 4 },
  ],
  topImprovements: [
    { improvement: "System design", count: 5 },
    { improvement: "Algorithm optimization", count: 4 },
    { improvement: "Specific technology experience", count: 3 },
    { improvement: "Behavioral examples", count: 3 },
  ],
}

export function FeedbackManagement() {
  const [feedback, setFeedback] = useState(mockFeedback)
  const [feedbackForm, setFeedbackForm] = useState(mockFeedbackForm)
  const [activeTab, setActiveTab] = useState("received")
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle feedback helpfulness rating
  const handleFeedbackHelpful = (id: string, helpful: boolean) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, helpful } : item)))
  }

  // Handle form input changes
  const handleFormChange = (questionId: string, value: any) => {
    setFeedbackForm({
      ...feedbackForm,
      questions: feedbackForm.questions.map((q) => (q.id === questionId ? { ...q, answer: value } : q)),
    })
  }

  // Handle form submission
  const handleSubmitForm = async () => {
    // Check if all questions are answered
    const unanswered = feedbackForm.questions.some(
      (q) => q.answer === null || (typeof q.answer === "string" && q.answer.trim() === ""),
    )

    if (unanswered) {
      // Show error or validation message
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
        setActiveTab("received")
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get stage label
  const getStageLabel = (stage: string) => {
    return stage
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Get stage badge color
  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case "resume_screening":
      case "portfolio":
        return "bg-blue-900/30 text-blue-400 border-blue-800"
      case "phone_interview":
      case "screening":
        return "bg-purple-900/30 text-purple-400 border-purple-800"
      case "technical_interview":
      case "coding_challenge":
        return "bg-amber-900/30 text-amber-400 border-amber-800"
      case "final_interview":
      case "onsite":
        return "bg-green-900/30 text-green-400 border-green-800"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-800"
    }
  }

  // Get rating stars
  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("h-4 w-4", star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-600")}
          />
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Feedback Management
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Review and provide feedback on your application process
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-gray-700 bg-gray-800/50 hover:bg-gray-800">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                  <DropdownMenuLabel>Filter Feedback</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="focus:bg-gray-800">Most Recent</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800">Highest Rated</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800">Needs Response</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800/50 border border-gray-700">
                <TabsTrigger
                  value="received"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Received Feedback
                </TabsTrigger>
                <TabsTrigger
                  value="provide"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Provide Feedback
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="mt-4 space-y-4">
                {feedback.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-800 p-3">
                      <MessageSquare className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">No feedback received</h3>
                    <p className="mt-2 text-sm text-gray-400">
                      You haven't received any feedback on your applications yet.
                    </p>
                  </div>
                ) : (
                  feedback.map((item) => (
                    <Collapsible
                      key={item.id}
                      open={expandedFeedback === item.id}
                      onOpenChange={() => setExpandedFeedback(expandedFeedback === item.id ? null : item.id)}
                      className="rounded-lg border bg-gray-800/30 overflow-hidden transition-all duration-200 border-gray-700 hover:border-blue-700/50"
                    >
                      <div className="p-4">
                        <CollapsibleTrigger className="flex items-start justify-between w-full text-left">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                              <AvatarImage src={item.companyLogo} alt={item.company} />
                              <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                                {item.company.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-white">{item.jobTitle}</h3>
                              <p className="text-sm text-gray-400">{item.company}</p>
                              <div className="flex items-center mt-1 space-x-2">
                                <Badge variant="outline" className={getStageBadgeColor(item.stage)}>
                                  {getStageLabel(item.stage)}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(item.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {getRatingStars(item.rating)}
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 text-gray-400 transition-transform",
                                expandedFeedback === item.id && "rotate-180",
                              )}
                            />
                          </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="mt-4 pt-4 border-t border-gray-700">
                          <div className="space-y-4">
                            {/* Reviewer info if not anonymous */}
                            {!item.anonymous && item.reviewerName && (
                              <div className="flex items-center space-x-2 mb-3">
                                <Avatar className="h-6 w-6 rounded-full">
                                  <AvatarImage src={item.reviewerAvatar} alt={item.reviewerName} />
                                  <AvatarFallback className="bg-blue-800 text-blue-200">
                                    {item.reviewerName.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-white">{item.reviewerName}</p>
                                  <p className="text-xs text-gray-400">{item.reviewerTitle}</p>
                                </div>
                              </div>
                            )}

                            {/* Feedback text */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Feedback</h4>
                              <p className="text-sm text-white bg-gray-800/50 p-3 rounded-md border border-gray-700">
                                {item.feedback}
                              </p>
                            </div>

                            {/* Strengths and improvements */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                  Strengths
                                </h4>
                                <ul className="space-y-1">
                                  {item.strengths.map((strength, index) => (
                                    <li key={index} className="text-sm text-white flex items-start">
                                      <span className="text-green-400 mr-2">•</span>
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                                  <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                                  Areas for Improvement
                                </h4>
                                <ul className="space-y-1">
                                  {item.improvements.map((improvement, index) => (
                                    <li key={index} className="text-sm text-white flex items-start">
                                      <span className="text-amber-400 mr-2">•</span>
                                      {improvement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Feedback helpfulness */}
                            <div className="pt-3 border-t border-gray-700">
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Was this feedback helpful?</h4>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "border-gray-700 hover:bg-gray-800",
                                    item.helpful === true && "bg-blue-900/20 border-blue-700 text-blue-400",
                                  )}
                                  onClick={() => handleFeedbackHelpful(item.id, true)}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Yes
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "border-gray-700 hover:bg-gray-800",
                                    item.helpful === false && "bg-blue-900/20 border-blue-700 text-blue-400",
                                  )}
                                  onClick={() => handleFeedbackHelpful(item.id, false)}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  No
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))
                )}
              </TabsContent>

              <TabsContent value="provide" className="mt-4">
                <Card className="bg-gray-800/30 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                        <AvatarImage src={feedbackForm.companyLogo} alt={feedbackForm.company} />
                        <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                          {feedbackForm.company.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{feedbackForm.jobTitle}</h3>
                        <p className="text-sm text-gray-400">{feedbackForm.company}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="outline" className={getStageBadgeColor(feedbackForm.stage)}>
                            {getStageLabel(feedbackForm.stage)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(feedbackForm.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {feedbackForm.questions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <Label htmlFor={question.id} className="text-sm font-medium text-gray-300">
                          {question.question}
                        </Label>

                        {question.type === "rating" && (
                          <div className="flex items-center space-x-2">
                            {question.options.map((option) => (
                              <Button
                                key={option}
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                  "h-8 w-8 p-0 border-gray-700",
                                  question.answer === option && "bg-blue-900/20 border-blue-700 text-blue-400",
                                )}
                                onClick={() => handleFormChange(question.id, option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}

                        {question.type === "text" && (
                          <Textarea
                            id={question.id}
                            value={question.answer || ""}
                            onChange={(e) => handleFormChange(question.id, e.target.value)}
                            placeholder="Enter your response..."
                            className="h-24 bg-gray-900 border-gray-700 text-white resize-none focus:border-blue-700 focus:ring-blue-700/20"
                          />
                        )}

                        {question.type === "radio" && (
                          <RadioGroup
                            value={question.answer || ""}
                            onValueChange={(value) => handleFormChange(question.id, value)}
                            className="space-y-2"
                          >
                            {question.options.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={option}
                                  id={`${question.id}-${option}`}
                                  className="border-gray-600 text-blue-500"
                                />
                                <Label htmlFor={`${question.id}-${option}`} className="text-gray-300">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-gray-700 pt-4">
                    <Button
                      onClick={handleSubmitForm}
                      disabled={isSubmitting || isSuccess}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Submitted Successfully
                        </>
                      ) : (
                        "Submit Feedback"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <Card className="bg-gray-800/30 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Feedback Analytics</CardTitle>
                    <CardDescription className="text-gray-400">Insights from your application feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-400 mb-1">Total Feedback</p>
                        <p className="text-3xl font-bold text-white">{mockAnalytics.totalFeedback}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-400 mb-1">Average Rating</p>
                        <div className="flex items-center">
                          <p className="text-3xl font-bold text-white mr-2">{mockAnalytics.averageRating}</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= Math.round(mockAnalytics.averageRating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-600",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-400 mb-1">Feedback by Stage</p>
                        <div className="w-full mt-2">
                          {mockAnalytics.byStage.map((stage) => (
                            <div key={stage.stage} className="mb-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">{getStageLabel(stage.stage)}</span>
                                <span className="text-white">{stage.count}</span>
                              </div>
                              <Progress
                                value={(stage.count / mockAnalytics.totalFeedback) * 100}
                                className="h-1.5 mt-1 bg-gray-700"
                                indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          Top Strengths
                        </h4>
                        <div className="space-y-2">
                          {mockAnalytics.topStrengths.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-white">{item.strength}</span>
                              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">
                                {item.count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                          Top Areas for Improvement
                        </h4>
                        <div className="space-y-2">
                          {mockAnalytics.topImprovements.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-white">{item.improvement}</span>
                              <Badge variant="outline" className="bg-amber-900/30 text-amber-400 border-amber-800">
                                {item.count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

