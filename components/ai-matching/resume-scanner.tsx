"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ScanSearch,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Code,
  GraduationCap,
  Briefcase,
  Edit,
  ArrowRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ResumeData {
  skills: { name: string; confidence: number }[]
  experience: { title: string; company: string; duration: string; confidence: number }[]
  education: { degree: string; institution: string; year: string; confidence: number }[]
}

export function ResumeScannerInterface({ onComplete }: { onComplete?: (data: ResumeData) => void }) {
  const [activeStep, setActiveStep] = useState<string>("upload")
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [previewText, setPreviewText] = useState<string>("")
  const [scanComplete, setScanComplete] = useState(false)
  const [dataQuality, setDataQuality] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>({
    skills: [],
    experience: [],
    education: [],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Demo data for visualization
  const mockResumeData: ResumeData = {
    skills: [
      { name: "React", confidence: 92 },
      { name: "TypeScript", confidence: 88 },
      { name: "JavaScript", confidence: 95 },
      { name: "HTML/CSS", confidence: 90 },
      { name: "Node.js", confidence: 75 },
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        duration: "2020 - Present",
        confidence: 95,
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions Co.",
        duration: "2017 - 2020",
        confidence: 90,
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of Technology",
        year: "2017",
        confidence: 92,
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "Coding Academy",
        year: "2019",
        confidence: 85,
      },
    ],
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Simple file preview for demo purposes
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.name.endsWith(".doc") ||
      selectedFile.name.endsWith(".docx")
    ) {
      setPreviewText(`File selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`)
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      })
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const simulateScan = () => {
    if (!file) return

    setActiveStep("scanning")
    setScanning(true)
    setProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setScanning(false)
            setScanComplete(true)
            setResumeData(mockResumeData)
            setActiveStep("review")

            // Calculate data quality based on confidence scores
            const avgConfidence =
              [
                ...mockResumeData.skills.map((s) => s.confidence),
                ...mockResumeData.experience.map((e) => e.confidence),
                ...mockResumeData.education.map((e) => e.confidence),
              ].reduce((sum, val) => sum + val, 0) /
              (mockResumeData.skills.length + mockResumeData.experience.length + mockResumeData.education.length)

            setDataQuality(avgConfidence)
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleSkillEdit = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills[index] = { ...updatedSkills[index], name: value }
    setResumeData({ ...resumeData, skills: updatedSkills })
  }

  const handleExperienceEdit = (index: number, field: "title" | "company" | "duration", value: string) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setResumeData({ ...resumeData, experience: updatedExperience })
  }

  const handleEducationEdit = (index: number, field: "degree" | "institution" | "year", value: string) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setResumeData({ ...resumeData, education: updatedEducation })
  }

  const handleFinish = () => {
    if (onComplete) {
      onComplete(resumeData)
    }

    toast({
      title: "Profile Updated",
      description: "Your resume data has been successfully processed and added to your profile.",
    })
  }

  const getQualityText = (quality: number) => {
    if (quality >= 90) return "Excellent"
    if (quality >= 80) return "Good"
    if (quality >= 70) return "Fair"
    return "Needs Improvement"
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-green-400"
    if (quality >= 80) return "text-brand-400"
    if (quality >= 70) return "text-amber-400"
    return "text-red-400"
  }

  const renderConfidenceBadge = (confidence: number) => {
    let color = "bg-red-500/20 text-red-400 border-red-800"

    if (confidence >= 90) {
      color = "bg-green-500/20 text-green-400 border-green-800"
    } else if (confidence >= 80) {
      color = "bg-brand-500/20 text-brand-400 border-brand-800"
    } else if (confidence >= 70) {
      color = "bg-amber-500/20 text-amber-400 border-amber-800"
    }

    return (
      <Badge variant="outline" className={cn("ml-2", color)}>
        {confidence}% Match
      </Badge>
    )
  }

  return (
    <Card className="bg-gradient-card glow-effect w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-gradient-brand">Resume Scanner & Parser</CardTitle>
        <CardDescription className="text-gray-400">
          Upload your resume to automatically extract your skills, experience, and education
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="upload"
              disabled={scanning}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <FileText className="mr-2 h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="scanning"
              disabled={!file || scanComplete}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <ScanSearch className="mr-2 h-4 w-4" />
              Scanning
            </TabsTrigger>
            <TabsTrigger
              value="review"
              disabled={!scanComplete}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Review
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
                  file ? "border-brand-700 bg-brand-500/5" : "border-gray-700 hover:border-gray-600 bg-gray-800/20",
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />

                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-brand-500/10 border border-brand-700">
                    <FileText className="h-8 w-8 text-brand-400" />
                  </div>

                  {file ? (
                    <>
                      <h3 className="text-lg font-medium text-white mt-2">{file.name}</h3>
                      <p className="text-sm text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB · {file.type || "Document"}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                          if (fileInputRef.current) fileInputRef.current.value = ""
                        }}
                      >
                        Change File
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium text-white mt-2">Drag & Drop or Click to Upload</h3>
                      <p className="text-sm text-gray-400">Support for PDF, DOC, DOCX (Max 10MB)</p>
                    </>
                  )}
                </div>
              </div>

              {previewText && (
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-medium text-white mb-2">File Preview</h4>
                  <p className="text-sm text-gray-300">{previewText}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Cancel
                </Button>
                <Button className="bg-gradient-primary" disabled={!file} onClick={simulateScan}>
                  Start Scanning
                </Button>
              </div>
            </TabsContent>

            {/* Scanning Tab */}
            <TabsContent value="scanning" className="min-h-[350px] flex flex-col items-center justify-center">
              <div className="space-y-8 w-full max-w-md text-center">
                <div className="relative mx-auto h-40 w-40 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Scanning animation */}
                  <div
                    className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-brand-500/20 to-transparent"
                    style={{
                      transform: `translateY(${progress - 10}%)`,
                      transition: "transform 0.3s ease-out",
                    }}
                  ></div>

                  <div className="flex items-center justify-center h-full">
                    <FileText className="h-20 w-20 text-gray-600" />
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-500/10 to-transparent"
                    style={{
                      height: `${progress}%`,
                      transition: "height 0.3s ease-out",
                    }}
                  ></div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    {progress < 30
                      ? "Analyzing Document Structure..."
                      : progress < 60
                        ? "Extracting Content..."
                        : progress < 90
                          ? "Processing Information..."
                          : "Finalizing Results..."}
                  </h3>

                  <Progress value={progress} className="h-2" />

                  <p className="text-sm text-gray-400">
                    {scanning ? (
                      <>
                        <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                        Scanning your resume and extracting information...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="inline-block mr-2 h-4 w-4 text-green-400" />
                        Scan complete! Reviewing extracted information.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review" className="space-y-6">
              <div className="mb-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Data Quality Score</h3>
                  <div className="flex items-center gap-2">
                    <span className={cn("font-bold", getQualityColor(dataQuality))}>{getQualityText(dataQuality)}</span>
                    <Progress value={dataQuality} className="w-32 h-2" />
                    <span className="text-gray-400 text-sm">{Math.round(dataQuality)}%</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
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
                </TabsList>

                <div className="mt-4 space-y-4">
                  {/* Skills Tab */}
                  <TabsContent value="skills" className="space-y-4">
                    <div className="grid gap-3">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={skill.name}
                            onChange={(e) => handleSkillEdit(index, e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          {renderConfidenceBadge(skill.confidence)}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      + Add More Skills
                    </Button>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience" className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Input
                                value={exp.title}
                                onChange={(e) => handleExperienceEdit(index, "title", e.target.value)}
                                className="text-white font-medium bg-gray-800 border-gray-700"
                              />
                              {renderConfidenceBadge(exp.confidence)}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                value={exp.company}
                                onChange={(e) => handleExperienceEdit(index, "company", e.target.value)}
                                className="text-gray-300 bg-gray-800 border-gray-700"
                              />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                value={exp.duration}
                                onChange={(e) => handleExperienceEdit(index, "duration", e.target.value)}
                                className="text-gray-400 bg-gray-800 border-gray-700"
                              />
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      + Add More Experience
                    </Button>
                  </TabsContent>

                  {/* Education Tab */}
                  <TabsContent value="education" className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Input
                                value={edu.degree}
                                onChange={(e) => handleEducationEdit(index, "degree", e.target.value)}
                                className="text-white font-medium bg-gray-800 border-gray-700"
                              />
                              {renderConfidenceBadge(edu.confidence)}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                value={edu.institution}
                                onChange={(e) => handleEducationEdit(index, "institution", e.target.value)}
                                className="text-gray-300 bg-gray-800 border-gray-700"
                              />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                value={edu.year}
                                onChange={(e) => handleEducationEdit(index, "year", e.target.value)}
                                className="text-gray-400 bg-gray-800 border-gray-700"
                              />
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      + Add More Education
                    </Button>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm text-gray-400">
          <InfoIcon className="inline-block mr-1 h-4 w-4" />
          Your data is securely processed and never shared without your consent
        </div>
        {scanComplete && (
          <Button className="bg-gradient-primary" onClick={handleFinish}>
            Add to Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Simple info icon component
function InfoIcon(props: React.ComponentProps<typeof AlertCircle>) {
  return <AlertCircle {...props} />
}

