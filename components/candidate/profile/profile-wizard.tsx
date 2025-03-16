"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ResumeUploader } from "@/components/candidate/profile/resume-uploader"
import { CheckCircle, ChevronRight, User, Briefcase, MapPin, GraduationCap, FileText } from "lucide-react"

const steps = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "preferences", label: "Preferences", icon: MapPin },
]

export function ProfileWizard() {
  const [currentStep, setCurrentStep] = useState("personal")
  const [progress, setProgress] = useState(20)
  const [resumeUploaded, setResumeUploaded] = useState(false)

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
      setProgress((nextIndex + 1) * 20)
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
      setProgress((prevIndex + 1) * 20)
    }
  }

  const handleResumeUpload = (files: File[]) => {
    setResumeUploaded(true)
  }

  return (
    <Card className="bg-gradient-card glow-effect">
      <CardHeader>
        <CardTitle className="text-gradient-brand">Complete Your Profile</CardTitle>
        <CardDescription className="text-gray-400">
          Let's set up your profile to help you find the perfect job matches
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Profile completion</span>
            <span className="text-sm font-medium text-white">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800" />
        </div>

        {/* Steps indicator */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isCompleted
                      ? "border-brand-500 bg-brand-500/20 text-brand-400"
                      : isCurrent
                        ? "border-brand-400 bg-brand-500/10 text-white"
                        : "border-gray-700 bg-gray-800/50 text-gray-500",
                  )}
                >
                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCompleted ? "text-brand-400" : isCurrent ? "text-white" : "text-gray-500",
                  )}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="mt-8">
          {currentStep === "personal" && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">
                  Phone Number
                </Label>
                <Input id="phone" placeholder="(123) 456-7890" className="bg-gray-800 border-gray-700 text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-200">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, State, Country"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-200">
                  Professional Summary
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Write a brief professional summary..."
                  className="bg-gray-800 border-gray-700 text-white resize-none h-24"
                />
              </div>
            </div>
          )}

          {currentStep === "resume" && (
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-6">
                <h3 className="text-lg font-medium text-white mb-2">Upload Your Resume</h3>
                <p className="text-gray-400 mb-4">
                  Upload your resume to automatically fill in your experience, education, and skills.
                </p>
                <ResumeUploader onUploadComplete={handleResumeUpload} />
              </div>

              {resumeUploaded && (
                <div className="rounded-lg border border-green-700 bg-green-900/20 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-white">Resume Uploaded Successfully</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        We've extracted your information. You can review and edit in the next steps.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === "experience" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Work Experience</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Add Experience
                </Button>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">Senior Frontend Developer</h4>
                      <p className="text-gray-400">TechCorp Inc.</p>
                      <p className="text-sm text-gray-500">Jan 2020 - Present</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Edit
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-300 text-sm">
                      Led frontend development for multiple projects using React, TypeScript, and modern web
                      technologies.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">Frontend Developer</h4>
                      <p className="text-gray-400">WebSolutions Co.</p>
                      <p className="text-sm text-gray-500">Mar 2017 - Dec 2019</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Edit
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-300 text-sm">
                      Developed responsive web applications and implemented UI/UX designs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "education" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Education</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Add Education
                </Button>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">Bachelor of Science in Computer Science</h4>
                      <p className="text-gray-400">University of Technology</p>
                      <p className="text-sm text-gray-500">2013 - 2017</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-white">Certifications</h4>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="rounded-full bg-brand-500/20 border border-brand-700 px-3 py-1 text-sm text-brand-300">
                      AWS Certified Developer
                    </div>
                    <div className="rounded-full bg-brand-500/20 border border-brand-700 px-3 py-1 text-sm text-brand-300">
                      React Certification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "preferences" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Job Preferences</h3>
              <p className="text-gray-400">Help us find the best job matches for you by setting your preferences.</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType" className="text-gray-200">
                    Job Type
                  </Label>
                  <Select>
                    <SelectTrigger id="jobType" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="fullTime" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Full-time
                      </SelectItem>
                      <SelectItem value="partTime" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Part-time
                      </SelectItem>
                      <SelectItem value="contract" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Contract
                      </SelectItem>
                      <SelectItem value="freelance" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Freelance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workLocation" className="text-gray-200">
                    Work Location
                  </Label>
                  <Select>
                    <SelectTrigger id="workLocation" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select work location" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="remote" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Remote
                      </SelectItem>
                      <SelectItem value="onsite" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        On-site
                      </SelectItem>
                      <SelectItem value="hybrid" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Hybrid
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="minSalary" className="text-gray-200">
                      Minimum Salary
                    </Label>
                    <Input
                      id="minSalary"
                      type="number"
                      placeholder="$"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSalary" className="text-gray-200">
                      Maximum Salary
                    </Label>
                    <Input
                      id="maxSalary"
                      type="number"
                      placeholder="$"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industries" className="text-gray-200">
                    Preferred Industries
                  </Label>
                  <Select>
                    <SelectTrigger id="industries" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select industries" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="tech" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Technology
                      </SelectItem>
                      <SelectItem value="healthcare" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Healthcare
                      </SelectItem>
                      <SelectItem value="finance" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Finance
                      </SelectItem>
                      <SelectItem value="education" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Education
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Previous
        </Button>

        <Button onClick={handleNext} disabled={currentStepIndex === steps.length - 1} className="bg-gradient-primary">
          {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
          {currentStepIndex !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

