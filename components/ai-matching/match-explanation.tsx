"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Code,
  GraduationCap,
  Briefcase,
  Heart,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ThumbsUp,
  ThumbsDown,
  Download,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface MatchExplanationProps {
  candidateId: string
  jobId: string
  matchScore: number
  candidateName?: string
  jobTitle?: string
  onFeedback?: (feedback: "positive" | "negative", comment?: string) => void
}

// Example types for our match data
interface SkillMatch {
  name: string
  required: boolean
  candidateLevel: number
  jobLevel: number
  score: number
}

interface ExperienceMatch {
  name: string
  required: boolean
  candidateHasIt: boolean
  candidateYears?: number
  jobYears?: number
  score: number
}

interface EducationMatch {
  name: string
  required: boolean
  candidateHasIt: boolean
  score: number
}

interface CultureMatch {
  name: string
  required: boolean
  score: number
}

interface MatchData {
  skills: SkillMatch[]
  experience: ExperienceMatch[]
  education: EducationMatch[]
  culture: CultureMatch[]
  categoryScores: {
    skills: number
    experience: number
    education: number
    culture: number
  }
  requirementsMet: boolean
}

export function MatchExplanation({
  candidateId,
  jobId,
  matchScore,
  candidateName = "Alex Johnson",
  jobTitle = "Senior Frontend Developer",
  onFeedback,
}: MatchExplanationProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "skills",
    "experience",
    "education",
    "culture",
  ])
  const { toast } = useToast()

  // Mock data for the match explanation
  const matchData: MatchData = {
    skills: [
      { name: "React", required: true, candidateLevel: 90, jobLevel: 80, score: 100 },
      { name: "TypeScript", required: true, candidateLevel: 85, jobLevel: 70, score: 100 },
      { name: "JavaScript", required: true, candidateLevel: 95, jobLevel: 90, score: 100 },
      { name: "HTML/CSS", required: false, candidateLevel: 75, jobLevel: 60, score: 100 },
      { name: "Node.js", required: false, candidateLevel: 65, jobLevel: 50, score: 100 },
    ],
    experience: [
      {
        name: "Frontend Development",
        required: true,
        candidateHasIt: true,
        candidateYears: 5,
        jobYears: 3,
        score: 100,
      },
      {
        name: "React Native",
        required: false,
        candidateHasIt: false,
        score: 0,
      },
      {
        name: "Team Leadership",
        required: false,
        candidateHasIt: true,
        candidateYears: 2,
        jobYears: 1,
        score: 100,
      },
    ],
    education: [
      { name: "Computer Science Degree", required: false, candidateHasIt: true, score: 100 },
      { name: "Coding Bootcamp", required: false, candidateHasIt: true, score: 100 },
    ],
    culture: [
      { name: "Teamwork", required: false, candidateHasIt: true, score: 90 },
      { name: "Communication", required: true, candidateHasIt: true, score: 85 },
      { name: "Problem Solving", required: true, candidateHasIt: true, score: 95 },
      { name: "Adaptability", required: false, candidateHasIt: true, score: 80 },
    ],
    categoryScores: {
      skills: 92,
      experience: 80,
      education: 100,
      culture: 88,
    },
    requirementsMet: true,
  }

  const handleToggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleFeedback = (type: "positive" | "negative") => {
    if (onFeedback) {
      onFeedback(type)
    }

    toast({
      title: type === "positive" ? "Positive Feedback Submitted" : "Negative Feedback Submitted",
      description: "Thank you for your feedback. We'll use it to improve our matching algorithm.",
    })
  }

  const downloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The match explanation report has been downloaded.",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-brand-400"
    if (score >= 50) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500/20 text-green-400 border-green-800"
    if (score >= 70) return "bg-brand-500/20 text-brand-400 border-brand-800"
    if (score >= 50) return "bg-amber-500/20 text-amber-400 border-amber-800"
    return "bg-red-500/20 text-red-400 border-red-800"
  }

  const renderMatchIndicator = (match: boolean, required: boolean) => {
    if (match) {
      return <CheckCircle className="h-4 w-4 text-green-400" />
    }

    if (required) {
      return <XCircle className="h-4 w-4 text-red-400" />
    }

    return <AlertTriangle className="h-4 w-4 text-amber-400" />
  }

  return (
    <Card className="bg-gradient-card glow-effect w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-gradient-brand">Match Explanation</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed breakdown of match between {candidateName} and {jobTitle}
            </CardDescription>
          </div>
          <Badge className={cn("text-lg font-bold w-fit", getScoreBgColor(matchScore))}>{matchScore}% Match</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="detailed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <Info className="mr-2 h-4 w-4" />
              Detailed Comparison
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Match Quality</h3>
                  <div>
                    {matchData.requirementsMet ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-800">All Requirements Met</Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-400 border-red-800">Missing Required Skills</Badge>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Overall Match Score</span>
                      <span className={getScoreColor(matchScore)}>{matchScore}%</span>
                    </div>
                    <Progress value={matchScore} className="h-2" />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-3">
                    <h4 className="font-medium text-white">Category Breakdown</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Code className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Skills</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={matchData.categoryScores.skills} className="w-32 h-2" />
                          <span className={getScoreColor(matchData.categoryScores.skills)}>
                            {matchData.categoryScores.skills}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={matchData.categoryScores.experience} className="w-32 h-2" />
                          <span className={getScoreColor(matchData.categoryScores.experience)}>
                            {matchData.categoryScores.experience}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Education</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={matchData.categoryScores.education} className="w-32 h-2" />
                          <span className={getScoreColor(matchData.categoryScores.education)}>
                            {matchData.categoryScores.education}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-brand-400" />
                          <span className="text-gray-300">Culture Fit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={matchData.categoryScores.culture} className="w-32 h-2" />
                          <span className={getScoreColor(matchData.categoryScores.culture)}>
                            {matchData.categoryScores.culture}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-brand-950/30 border border-brand-900 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-brand-400 mt-0.5 mr-3 shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Match Analysis</h4>
                      <p className="text-gray-300 text-sm">
                        This candidate is an excellent match for the position, with strong skills in all required areas.
                        They exceed requirements in React, TypeScript, and JavaScript, and have sufficient experience in
                        frontend development. While they lack React Native experience, this was not a required skill.
                        Their strong problem solving abilities and communication skills make them a good cultural fit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Detailed Comparison Tab */}
            <TabsContent value="detailed" className="space-y-6">
              <TooltipProvider>
                <div className="space-y-5">
                  {/* Skills Section */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleToggleCategory("skills")}
                    >
                      <div className="flex items-center">
                        <Code className="mr-2 h-5 w-5 text-brand-400" />
                        <h3 className="text-lg font-medium text-white">Skills</h3>
                        <Badge className="ml-3 bg-brand-500/20 text-brand-400 border-brand-800">
                          {matchData.categoryScores.skills}% Match
                        </Badge>
                      </div>
                      {expandedCategories.includes("skills") ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {expandedCategories.includes("skills") && (
                      <div className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b border-gray-700">
                              <th className="pb-2 font-medium text-gray-300">Skill</th>
                              <th className="pb-2 font-medium text-gray-300">Required</th>
                              <th className="pb-2 font-medium text-gray-300">Job Level</th>
                              <th className="pb-2 font-medium text-gray-300">Candidate Level</th>
                              <th className="pb-2 font-medium text-gray-300">Match</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {matchData.skills.map((skill, index) => (
                              <tr key={index} className="h-12">
                                <td className="text-white">{skill.name}</td>
                                <td>
                                  {skill.required ? (
                                    <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">Required</Badge>
                                  ) : (
                                    <span className="text-gray-400">Preferred</span>
                                  )}
                                </td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <Progress value={skill.jobLevel} className="w-16 h-2" />
                                    <span className="text-gray-300 text-sm">{skill.jobLevel}%</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <Progress value={skill.candidateLevel} className="w-16 h-2" />
                                    <span className="text-gray-300 text-sm">{skill.candidateLevel}%</span>
                                  </div>
                                </td>
                                <td>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge className={getScoreBgColor(skill.score)}>{skill.score}%</Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        {skill.score === 100
                                          ? "Perfect match"
                                          : skill.score >= 70
                                            ? "Good match"
                                            : "Needs improvement"}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleToggleCategory("experience")}
                    >
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-brand-400" />
                        <h3 className="text-lg font-medium text-white">Experience</h3>
                        <Badge className="ml-3 bg-brand-500/20 text-brand-400 border-brand-800">
                          {matchData.categoryScores.experience}% Match
                        </Badge>
                      </div>
                      {expandedCategories.includes("experience") ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {expandedCategories.includes("experience") && (
                      <div className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b border-gray-700">
                              <th className="pb-2 font-medium text-gray-300">Area</th>
                              <th className="pb-2 font-medium text-gray-300">Required</th>
                              <th className="pb-2 font-medium text-gray-300">Job Requirement</th>
                              <th className="pb-2 font-medium text-gray-300">Candidate Has</th>
                              <th className="pb-2 font-medium text-gray-300">Match</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {matchData.experience.map((exp, index) => (
                              <tr key={index} className="h-12">
                                <td className="text-white">{exp.name}</td>
                                <td>
                                  {exp.required ? (
                                    <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">Required</Badge>
                                  ) : (
                                    <span className="text-gray-400">Preferred</span>
                                  )}
                                </td>
                                <td className="text-gray-300">
                                  {exp.jobYears ? `${exp.jobYears}+ years` : "Experience Needed"}
                                </td>
                                <td className="text-gray-300">
                                  {exp.candidateHasIt
                                    ? exp.candidateYears
                                      ? `${exp.candidateYears} years`
                                      : "Yes"
                                    : "No"}
                                </td>
                                <td className="flex items-center">
                                  <div className="mr-2">{renderMatchIndicator(exp.candidateHasIt, exp.required)}</div>
                                  <Badge className={getScoreBgColor(exp.score)}>{exp.score}%</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Education Section */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleToggleCategory("education")}
                    >
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-brand-400" />
                        <h3 className="text-lg font-medium text-white">Education</h3>
                        <Badge className="ml-3 bg-brand-500/20 text-brand-400 border-brand-800">
                          {matchData.categoryScores.education}% Match
                        </Badge>
                      </div>
                      {expandedCategories.includes("education") ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {expandedCategories.includes("education") && (
                      <div className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b border-gray-700">
                              <th className="pb-2 font-medium text-gray-300">Qualification</th>
                              <th className="pb-2 font-medium text-gray-300">Required</th>
                              <th className="pb-2 font-medium text-gray-300">Candidate Has</th>
                              <th className="pb-2 font-medium text-gray-300">Match</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {matchData.education.map((edu, index) => (
                              <tr key={index} className="h-12">
                                <td className="text-white">{edu.name}</td>
                                <td>
                                  {edu.required ? (
                                    <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">Required</Badge>
                                  ) : (
                                    <span className="text-gray-400">Preferred</span>
                                  )}
                                </td>
                                <td className="text-gray-300">{edu.candidateHasIt ? "Yes" : "No"}</td>
                                <td className="flex items-center">
                                  <div className="mr-2">{renderMatchIndicator(edu.candidateHasIt, edu.required)}</div>
                                  <Badge className={getScoreBgColor(edu.score)}>{edu.score}%</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Culture Fit Section */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleToggleCategory("culture")}
                    >
                      <div className="flex items-center">
                        <Heart className="mr-2 h-5 w-5 text-brand-400" />
                        <h3 className="text-lg font-medium text-white">Culture Fit</h3>
                        <Badge className="ml-3 bg-brand-500/20 text-brand-400 border-brand-800">
                          {matchData.categoryScores.culture}% Match
                        </Badge>
                      </div>
                      {expandedCategories.includes("culture") ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {expandedCategories.includes("culture") && (
                      <div className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b border-gray-700">
                              <th className="pb-2 font-medium text-gray-300">Attribute</th>
                              <th className="pb-2 font-medium text-gray-300">Required</th>
                              <th className="pb-2 font-medium text-gray-300">Candidate Score</th>
                              <th className="pb-2 font-medium text-gray-300">Match</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {matchData.culture.map((culture, index) => (
                              <tr key={index} className="h-12">
                                <td className="text-white">{culture.name}</td>
                                <td>
                                  {culture.required ? (
                                    <Badge className="bg-brand-500/20 text-brand-400 border-brand-800">Required</Badge>
                                  ) : (
                                    <span className="text-gray-400">Preferred</span>
                                  )}
                                </td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <Progress value={culture.score} className="w-16 h-2" />
                                    <span className="text-gray-300 text-sm">{culture.score}%</span>
                                  </div>
                                </td>
                                <td className="flex items-center">
                                  <div className="mr-2">
                                    {renderMatchIndicator(culture.score >= 70, culture.required)}
                                  </div>
                                  <Badge className={getScoreBgColor(culture.score)}>{culture.score}%</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </TooltipProvider>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <Button
          variant="outline"
          onClick={downloadReport}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleFeedback("negative")}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            Inaccurate
          </Button>
          <Button onClick={() => handleFeedback("positive")} className="bg-gradient-primary">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Accurate
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

