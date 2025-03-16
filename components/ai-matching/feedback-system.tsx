"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  ThumbsDown,
  Send,
  BarChart,
  BrainCircuit,
  Info,
  Loader2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  LightbulbIcon,
  SparklesIcon,
  SearchCheckIcon,
  RefreshCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface FeedbackSystemProps {
  userType: "recruiter" | "candidate"
  onFeedbackSubmit?: (feedback: any) => void
}

export function FeedbackSystem({ userType, onFeedbackSubmit }: FeedbackSystemProps) {
  const [activeTab, setActiveTab] = useState("quick-feedback")
  const [quickFeedback, setQuickFeedback] = useState<"positive" | "negative" | null>(null)
  const [detailedFeedback, setDetailedFeedback] = useState({
    relevance: "",
    accuracy: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [showImprovement, setShowImprovement] = useState(false)
  const { toast } = useToast()

  // Mock data for analytics
  const analyticsData = {
    accuracy: userType === "recruiter" ? 87 : 82,
    relevant: userType === "recruiter" ? 92 : 78,
    userSatisfaction: userType === "recruiter" ? 85 : 76,
    weeklyChange: userType === "recruiter" ? +3.5 : +5.2,
    abTest: {
      current: "Model A",
      performance: 87,
      alternative: "Model B",
      alternativePerformance: 84,
    },
    improvements: [
      {
        date: "March 10, 2025",
        title: "Enhanced Skill Matching",
        description: "Improved ability to match technical skills with job requirements",
      },
      {
        date: "February 22, 2025",
        title: "Culture Fit Prediction",
        description: "New algorithm to better predict culture fit between candidates and companies",
      },
      {
        date: "January 15, 2025",
        title: "Experience Relevance Scoring",
        description: "More accurate assessment of relevant experience for job roles",
      },
    ],
  }

  const handleQuickFeedbackChange = (value: "positive" | "negative") => {
    setQuickFeedback(value)
  }

  const handleDetailedFeedbackChange = (field: string, value: string) => {
    setDetailedFeedback((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitFeedback = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (onFeedbackSubmit) {
        const feedbackData = activeTab === "quick-feedback" ? { type: quickFeedback } : { ...detailedFeedback }

        onFeedbackSubmit(feedbackData)
      }

      setIsSubmitting(false)
      setFeedbackSubmitted(true)

      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping us improve our AI matching system.",
      })

      // Reset after a delay
      setTimeout(() => {
        setQuickFeedback(null)
        setDetailedFeedback({
          relevance: "",
          accuracy: "",
          comments: "",
        })
        setFeedbackSubmitted(false)
      }, 2000)
    }, 1000)
  }

  const formatChange = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`
  }

  return (
    <Card className="bg-gradient-card glow-effect w-full">
      <CardHeader>
        <CardTitle className="text-gradient-brand">AI Matching Feedback</CardTitle>
        <CardDescription className="text-gray-400">
          Help us improve our matching algorithm by providing feedback
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="quick-feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Quick Feedback
            </TabsTrigger>
            <TabsTrigger
              value="detailed-feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <BrainCircuit className="mr-2 h-4 w-4" />
              Detailed Feedback
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <BarChart className="mr-2 h-4 w-4" />
              System Analytics
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {/* Quick Feedback Tab */}
            <TabsContent value="quick-feedback" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  How are our {userType === "recruiter" ? "candidate" : "job"} recommendations working for you?
                </h3>

                <div className="flex gap-4 justify-center pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "flex-1 h-24 border-gray-700 flex flex-col gap-2 transition-all",
                      quickFeedback === "positive" && "border-green-600 bg-green-900/20 text-green-400",
                    )}
                    onClick={() => handleQuickFeedbackChange("positive")}
                    disabled={isSubmitting || feedbackSubmitted}
                  >
                    <ThumbsUp
                      className={cn("h-8 w-8", quickFeedback === "positive" ? "text-green-400" : "text-gray-400")}
                    />
                    <span>Helpful</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "flex-1 h-24 border-gray-700 flex flex-col gap-2 transition-all",
                      quickFeedback === "negative" && "border-red-600 bg-red-900/20 text-red-400",
                    )}
                    onClick={() => handleQuickFeedbackChange("negative")}
                    disabled={isSubmitting || feedbackSubmitted}
                  >
                    <ThumbsDown
                      className={cn("h-8 w-8", quickFeedback === "negative" ? "text-red-400" : "text-gray-400")}
                    />
                    <span>Not Helpful</span>
                  </Button>
                </div>

                {quickFeedback === "negative" && (
                  <div className="pt-4">
                    <Textarea
                      placeholder="Tell us how we can improve our recommendations..."
                      className="bg-gray-800 border-gray-700 text-white resize-none h-24"
                      disabled={isSubmitting || feedbackSubmitted}
                    />
                  </div>
                )}

                {feedbackSubmitted ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="bg-green-900/20 text-green-400 border border-green-800 rounded-lg px-4 py-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Thank you for your feedback!</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center pt-4">
                    <Button
                      className="bg-gradient-primary px-8"
                      disabled={!quickFeedback || isSubmitting}
                      onClick={handleSubmitFeedback}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Detailed Feedback Tab */}
            <TabsContent value="detailed-feedback" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">Help Us Improve</h3>
                  <p className="text-gray-400">
                    Your detailed feedback helps our AI learn and provide better{" "}
                    {userType === "recruiter" ? "candidate" : "job"} matches.
                  </p>
                </div>

                <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <div className="space-y-3">
                    <Label className="text-gray-300">
                      How relevant are the {userType === "recruiter" ? "candidates" : "jobs"} we're recommending?
                    </Label>
                    <RadioGroup
                      value={detailedFeedback.relevance}
                      onValueChange={(value) => handleDetailedFeedbackChange("relevance", value)}
                      className="grid grid-cols-1 md:grid-cols-5 gap-2"
                      disabled={isSubmitting || feedbackSubmitted}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-relevant" id="relevance-1" className="text-brand-400" />
                        <Label htmlFor="relevance-1" className="text-gray-300">
                          Not Relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="slightly-relevant" id="relevance-2" className="text-brand-400" />
                        <Label htmlFor="relevance-2" className="text-gray-300">
                          Slightly Relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderately-relevant" id="relevance-3" className="text-brand-400" />
                        <Label htmlFor="relevance-3" className="text-gray-300">
                          Moderately Relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-relevant" id="relevance-4" className="text-brand-400" />
                        <Label htmlFor="relevance-4" className="text-gray-300">
                          Very Relevant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="extremely-relevant" id="relevance-5" className="text-brand-400" />
                        <Label htmlFor="relevance-5" className="text-gray-300">
                          Extremely Relevant
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-3">
                    <Label className="text-gray-300">How accurate are the match percentages?</Label>
                    <RadioGroup
                      value={detailedFeedback.accuracy}
                      onValueChange={(value) => handleDetailedFeedbackChange("accuracy", value)}
                      className="grid grid-cols-1 md:grid-cols-5 gap-2"
                      disabled={isSubmitting || feedbackSubmitted}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-accurate" id="accuracy-1" className="text-brand-400" />
                        <Label htmlFor="accuracy-1" className="text-gray-300">
                          Not Accurate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="slightly-accurate" id="accuracy-2" className="text-brand-400" />
                        <Label htmlFor="accuracy-2" className="text-gray-300">
                          Slightly Accurate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderately-accurate" id="accuracy-3" className="text-brand-400" />
                        <Label htmlFor="accuracy-3" className="text-gray-300">
                          Moderately Accurate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-accurate" id="accuracy-4" className="text-brand-400" />
                        <Label htmlFor="accuracy-4" className="text-gray-300">
                          Very Accurate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="extremely-accurate" id="accuracy-5" className="text-brand-400" />
                        <Label htmlFor="accuracy-5" className="text-gray-300">
                          Extremely Accurate
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-3">
                    <Label htmlFor="comments" className="text-gray-300">
                      Additional Comments
                    </Label>
                    <Textarea
                      id="comments"
                      placeholder="Share your thoughts on how we can improve our matching algorithm..."
                      className="bg-gray-800 border-gray-700 text-white resize-none h-24"
                      value={detailedFeedback.comments}
                      onChange={(e) => handleDetailedFeedbackChange("comments", e.target.value)}
                      disabled={isSubmitting || feedbackSubmitted}
                    />
                  </div>
                </div>

                {feedbackSubmitted ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="bg-green-900/20 text-green-400 border border-green-800 rounded-lg px-4 py-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Thank you for your detailed feedback!</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center pt-4">
                    <Button
                      className="bg-gradient-primary px-8"
                      disabled={!detailedFeedback.relevance || !detailedFeedback.accuracy || isSubmitting}
                      onClick={handleSubmitFeedback}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Detailed Feedback
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gray-800/30 border border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Match Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <SearchCheckIcon className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Matching Accuracy</span>
                        </div>
                        <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">
                          {analyticsData.accuracy}%{" "}
                          <span className="text-green-400">{formatChange(analyticsData.weeklyChange)}</span>
                        </Badge>
                      </div>
                      <Progress value={analyticsData.accuracy} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <LightbulbIcon className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Recommendation Relevance</span>
                        </div>
                        <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">
                          {analyticsData.relevant}%
                        </Badge>
                      </div>
                      <Progress value={analyticsData.relevant} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ThumbsUp className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">User Satisfaction</span>
                        </div>
                        <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">
                          {analyticsData.userSatisfaction}%
                        </Badge>
                      </div>
                      <Progress value={analyticsData.userSatisfaction} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/30 border border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">A/B Testing Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                        Active Model: {analyticsData.abTest.current}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        Testing: {analyticsData.abTest.alternative}
                      </Badge>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{analyticsData.abTest.current}</span>
                        <span className="text-gray-300">{analyticsData.abTest.performance}%</span>
                      </div>
                      <Progress value={analyticsData.abTest.performance} className="h-2 bg-gray-700" />

                      <div className="flex justify-between">
                        <span className="text-gray-300">{analyticsData.abTest.alternative}</span>
                        <span className="text-gray-300">{analyticsData.abTest.alternativePerformance}%</span>
                      </div>
                      <Progress value={analyticsData.abTest.alternativePerformance} className="h-2 bg-gray-700" />
                    </div>

                    <div className="rounded-lg bg-gray-800 border border-gray-700 p-3">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-brand-400 mt-0.5 mr-2" />
                        <p className="text-sm text-gray-300">
                          We're testing a new matching algorithm that puts more emphasis on project experience.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800/30 border border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-lg">Recent System Improvements</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImprovement(!showImprovement)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showImprovement ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                {showImprovement && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {analyticsData.improvements.map((improvement, index) => (
                        <div key={index} className="flex gap-3 pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                          <div className="h-8 w-8 rounded-full bg-brand-900/50 border border-brand-800 flex items-center justify-center flex-shrink-0">
                            <SparklesIcon className="h-4 w-4 text-brand-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">{improvement.title}</h4>
                              <Badge variant="outline" className="text-xs bg-transparent border-gray-700 text-gray-400">
                                {improvement.date}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{improvement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <div className="flex items-center text-sm text-gray-400">
          <BrainCircuit className="mr-2 h-4 w-4 text-brand-400" />
          Our AI continuously improves based on your feedback
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Refresh Data
        </Button>
      </CardFooter>
    </Card>
  )
}

