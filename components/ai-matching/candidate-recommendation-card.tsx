"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  User,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  ThumbsUp,
  ThumbsDown,
  Mail,
  LightbulbIcon,
  InfoIcon,
  MoreHorizontal,
  Code,
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

interface CandidateRecommendationCardProps {
  candidate: {
    id: string
    name: string
    title: string
    location: string
    experience: string
    appliedDate: string
    matchScore: number
    isPremium?: boolean
    reasonForRecommendation: string
    highlightedSkills: string[]
    education?: string
  }
  jobTitle?: string
  onContact?: (candidateId: string) => void
  onViewProfile?: (candidateId: string) => void
  onViewMatch?: (candidateId: string) => void
  onMoreLikeThis?: (candidateId: string) => void
  onDismiss?: (candidateId: string) => void
  onFeedback?: (candidateId: string, type: "positive" | "negative") => void
}

export function CandidateRecommendationCard({
  candidate,
  jobTitle,
  onContact,
  onViewProfile,
  onViewMatch,
  onMoreLikeThis,
  onDismiss,
  onFeedback,
}: CandidateRecommendationCardProps) {
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

  const handleContact = () => {
    if (onContact) {
      onContact(candidate.id)
    }

    toast({
      title: "Contact initiated",
      description: `You can now message ${candidate.name}`,
    })
  }

  const handleFeedback = (type: "positive" | "negative") => {
    if (onFeedback) {
      onFeedback(candidate.id, type)
    }

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback on this recommendation.",
    })
  }

  const handleMoreLikeThis = () => {
    if (onMoreLikeThis) {
      onMoreLikeThis(candidate.id)
    }

    toast({
      title: "Finding similar candidates",
      description: "We're finding more candidates like this one for you.",
    })
  }

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(candidate.id)
    }

    toast({
      title: "Candidate dismissed",
      description: "This candidate will no longer appear in your recommendations.",
    })
  }

  const handleViewMatch = () => {
    if (onViewMatch) {
      onViewMatch(candidate.id)
    }
  }

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(candidate.id)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-brand-400"
    if (score >= 70) return "text-amber-400"
    return "text-red-400"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "bg-gray-900/80 backdrop-blur-sm border border-gray-800 overflow-hidden transition-all",
          candidate.isPremium && "border-brand-700",
        )}
      >
        {candidate.isPremium && (
          <div className="bg-gradient-to-r from-brand-500/20 to-blue-500/20 border-b border-brand-700 py-1 px-3 flex items-center justify-end">
            <Badge className="bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white border-amber-700">
              <Star className="mr-1 h-3 w-3" /> Premium Match
            </Badge>
          </div>
        )}

        <CardContent className="p-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white font-medium text-lg border border-gray-700">
                {getInitials(candidate.name)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white text-lg">{candidate.name}</h3>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span className="truncate">{candidate.title}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className={cn("font-bold text-lg", getScoreColor(candidate.matchScore))}>
                        {candidate.matchScore}%
                      </span>
                    </div>
                    <Progress value={candidate.matchScore} className="w-16 h-1.5 mt-1" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm mt-2">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    Applied {formatDate(candidate.appliedDate)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {candidate.highlightedSkills.map((skill, index) => (
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
                  <p className="text-sm text-gray-300">{candidate.reasonForRecommendation}</p>
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
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowReason(!showReason)}
                >
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{showReason ? "Hide Match Reason" : "Show Match Reason"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={handleViewMatch}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View Match Details</p>
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
                  Good match
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => handleFeedback("negative")}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Poor match
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewProfile}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button size="sm" onClick={handleContact} className="bg-gradient-primary">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

