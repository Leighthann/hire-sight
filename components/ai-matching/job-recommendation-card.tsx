"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BuildingIcon,
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Star,
  ShoppingCart,
  LightbulbIcon,
  InfoIcon,
  MoreHorizontal,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface JobRecommendationCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    salary: string
    postedDate: string
    matchScore: number
    isPremium?: boolean
    reasonForRecommendation: string
    matchingSkills: string[]
  }
  onSave?: (jobId: string) => void
  onAddToCart?: (jobId: string) => void
  onMoreLikeThis?: (jobId: string) => void
  onDismiss?: (jobId: string) => void
  onFeedback?: (jobId: string, type: "positive" | "negative") => void
}

export function JobRecommendationCard({
  job,
  onSave,
  onAddToCart,
  onMoreLikeThis,
  onDismiss,
  onFeedback,
}: JobRecommendationCardProps) {
  const [saved, setSaved] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [showReason, setShowReason] = useState(false)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "1 day ago"
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
    }
  }

  const handleSave = () => {
    setSaved(!saved)
    if (onSave) {
      onSave(job.id)
    }

    toast({
      title: saved ? "Job removed from saved" : "Job saved",
      description: saved
        ? "The job has been removed from your saved jobs"
        : "The job has been added to your saved jobs",
    })
  }

  const handleAddToCart = () => {
    setInCart(!inCart)
    if (onAddToCart) {
      onAddToCart(job.id)
    }

    toast({
      title: inCart ? "Job removed from cart" : "Job added to cart",
      description: inCart
        ? "The job has been removed from your application cart"
        : "The job has been added to your application cart",
    })
  }

  const handleFeedback = (type: "positive" | "negative") => {
    if (onFeedback) {
      onFeedback(job.id, type)
    }

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback on this recommendation.",
    })
  }

  const handleMoreLikeThis = () => {
    if (onMoreLikeThis) {
      onMoreLikeThis(job.id)
    }

    toast({
      title: "Finding similar jobs",
      description: "We're finding more jobs like this one for you.",
    })
  }

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(job.id)
    }

    toast({
      title: "Job dismissed",
      description: "This job will no longer appear in your recommendations.",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-brand-400"
    if (score >= 70) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "bg-gray-900/80 backdrop-blur-sm border border-gray-800 overflow-hidden transition-all",
          job.isPremium && "border-brand-700",
        )}
      >
        {job.isPremium && (
          <div className="bg-gradient-to-r from-brand-500/20 to-blue-500/20 border-b border-brand-700 py-1 px-3 flex items-center justify-end">
            <Badge className="bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white border-amber-700">
              <Star className="mr-1 h-3 w-3" /> Premium Match
            </Badge>
          </div>
        )}

        <CardContent className="p-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-white text-lg">{job.title}</h3>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <BuildingIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{job.company}</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className={cn("font-bold text-lg", getScoreColor(job.matchScore))}>{job.matchScore}%</span>
                </div>
                <Progress value={job.matchScore} className="w-16 h-1.5 mt-1" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-400">
                <DollarSign className="h-3.5 w-3.5 mr-1 text-gray-500" />
                {job.salary}
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                {formatDate(job.postedDate)}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.matchingSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-brand-500/10 text-brand-400 border-brand-800 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {showReason && (
              <div className="mt-2 p-2 rounded-md bg-gray-800/70 border border-gray-700">
                <div className="flex gap-2">
                  <LightbulbIcon className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{job.reasonForRecommendation}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 py-3 bg-gray-800/30 border-t border-gray-800 flex justify-between">
          <div className="flex gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8 text-gray-400 hover:text-white", saved && "text-brand-400 bg-brand-500/10")}
                  onClick={handleSave}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{saved ? "Unsave Job" : "Save Job"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8 text-gray-400 hover:text-white", inCart && "text-brand-400 bg-brand-500/10")}
                  onClick={handleAddToCart}
                >
                  {inCart ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{inCart ? "Remove from Cart" : "Add to Cart"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowReason(!showReason)}
                >
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{showReason ? "Hide Recommendation Reason" : "Show Recommendation Reason"}</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-gray-900 border-gray-700">
                <DropdownMenuItem
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={handleMoreLikeThis}
                >
                  More like this
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={handleDismiss}
                >
                  Not interested
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuLabel className="text-gray-400">Feedback</DropdownMenuLabel>
                <DropdownMenuItem
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => handleFeedback("positive")}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Good recommendation
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => handleFeedback("negative")}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Poor recommendation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button size="sm" className="bg-gradient-primary">
            View Job
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

