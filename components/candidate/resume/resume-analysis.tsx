"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Award, Code, MessageSquare, PenToolIcon as Tool, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for the resume analysis
const mockSkills = {
  technical: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript", level: 95 },
    { name: "HTML/CSS", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "GraphQL", level: 70 },
  ],
  soft: [
    { name: "Communication", level: 85 },
    { name: "Teamwork", level: 90 },
    { name: "Problem Solving", level: 95 },
    { name: "Time Management", level: 80 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Docker", level: 70 },
    { name: "VS Code", level: 95 },
    { name: "Jira", level: 80 },
  ],
}

const mockExperience = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    startDate: "2020-01",
    endDate: "Present",
    description: "Led frontend development for multiple projects using React, TypeScript, and modern web technologies.",
    highlights: [
      "Implemented responsive designs using Tailwind CSS",
      "Reduced bundle size by 40% through code splitting and lazy loading",
      "Mentored junior developers and conducted code reviews",
    ],
  },
  {
    title: "Frontend Developer",
    company: "WebSolutions Co.",
    location: "Austin, TX",
    startDate: "2017-03",
    endDate: "2019-12",
    description: "Developed responsive web applications and implemented UI/UX designs.",
    highlights: ["Built reusable component library", "Integrated RESTful APIs", "Improved page load times by 30%"],
  },
]

const mockEducation = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "Boston, MA",
    startDate: "2013",
    endDate: "2017",
    gpa: "3.8/4.0",
  },
]

const mockCertifications = [
  {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2021-05",
    expires: "2024-05",
  },
  {
    name: "React Certification",
    issuer: "Meta",
    date: "2020-08",
    expires: "2023-08",
  },
]

export function ResumeAnalysis() {
  const [activeTab, setActiveTab] = useState("skills")

  // Calculate profile completeness score
  const calculateCompletenessScore = () => {
    let score = 0

    // Basic profile info (assume it's complete)
    score += 20

    // Skills (based on number of skills)
    const totalSkills = Object.values(mockSkills).flat().length
    score += Math.min(20, (totalSkills / 10) * 20)

    // Experience (based on number of experiences)
    score += Math.min(20, (mockExperience.length / 2) * 20)

    // Education
    score += mockEducation.length > 0 ? 20 : 0

    // Certifications
    score += Math.min(20, (mockCertifications.length / 2) * 20)

    return Math.min(100, Math.round(score))
  }

  const completenessScore = calculateCompletenessScore()

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return dateString

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Completeness Card */}
        <Card className="bg-gradient-card glow-effect">
          <CardHeader className="pb-2">
            <CardTitle className="text-gradient-brand">Profile Strength</CardTitle>
            <CardDescription className="text-gray-400">How complete is your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-36 w-36">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle className="stroke-gray-700" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                  {/* Progress circle */}
                  <circle
                    className="stroke-brand-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - completenessScore / 100)}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={cn("text-3xl font-bold", getScoreColor(completenessScore))}>
                    {completenessScore}%
                  </span>
                  <span className="text-xs text-gray-400">Completeness</span>
                </div>
              </div>

              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Basic Info</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Skills</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Education</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Certifications</span>
                  <span className="text-green-400">Complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Analysis Card */}
        <Card className="md:col-span-2 bg-gradient-card glow-effect">
          <CardHeader>
            <CardTitle className="text-gradient-brand">Resume Analysis</CardTitle>
            <CardDescription className="text-gray-400">AI-powered insights from your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700">
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Certifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Technical Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {mockSkills.technical.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Soft Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {mockSkills.soft.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Tool className="h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Tools & Technologies</h3>
                  </div>
                  <div className="space-y-3">
                    {mockSkills.tools.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
                  {mockExperience.map((exp, index) => (
                    <div key={index} className="relative flex items-start md:flex-row-reverse">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 border border-gray-700 shadow-md md:order-1 md:mx-auto z-10">
                        <Briefcase className="h-5 w-5 text-brand-400" />
                      </div>

                      <div className="flex-1 ml-6 md:ml-0 md:mr-6 md:max-w-md">
                        <div className="relative p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium text-white">{exp.title}</h4>
                              <p className="text-gray-400">{exp.company}</p>
                              <p className="text-sm text-gray-500">{exp.location}</p>
                              <p className="text-sm text-gray-500">
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </p>
                            </div>
                          </div>

                          <p className="mt-2 text-sm text-gray-300">{exp.description}</p>

                          <div className="mt-3 space-y-1">
                            {exp.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 shrink-0" />
                                <p className="text-sm text-gray-300">{highlight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education" className="mt-6 space-y-6">
                {mockEducation.map((edu, index) => (
                  <div key={index} className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-white">{edu.degree}</h4>
                        <p className="text-gray-400">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.location}</p>
                        <p className="text-sm text-gray-500">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-brand-400" />
                        <span className="text-sm font-medium text-white">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="certifications" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockCertifications.map((cert, index) => (
                    <div key={index} className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 border border-gray-700">
                          <Award className="h-5 w-5 text-brand-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{cert.name}</h4>
                          <p className="text-sm text-gray-400">{cert.issuer}</p>
                          <p className="text-xs text-gray-500">
                            Issued: {formatDate(cert.date)} •
                            {cert.expires !== "N/A" ? ` Expires: ${formatDate(cert.expires)}` : " No Expiration"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

