"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sliders,
  Users,
  BarChart,
  Code,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Save,
  RotateCcw,
  AlertCircle,
  Info,
  PieChart,
  CheckCircle,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface MatchingConfigItem {
  id: string
  name: string
  weight: number
  required: boolean
}

interface MatchingConfig {
  skills: MatchingConfigItem[]
  experience: MatchingConfigItem[]
  education: MatchingConfigItem[]
  cultureAttributes: MatchingConfigItem[]
  diversityGoals: {
    enabled: boolean
    targetGroups: string[]
    priority: number
  }
  matchThreshold: number
}

export function MatchingConfigurator({ jobId, onSave }: { jobId?: string; onSave?: (config: MatchingConfig) => void }) {
  const [activeTab, setActiveTab] = useState("criteria")
  const [config, setConfig] = useState<MatchingConfig>({
    skills: [
      { id: "react", name: "React", weight: 80, required: true },
      { id: "typescript", name: "TypeScript", weight: 70, required: true },
      { id: "javascript", name: "JavaScript", weight: 90, required: true },
      { id: "html", name: "HTML/CSS", weight: 60, required: false },
      { id: "node", name: "Node.js", weight: 50, required: false },
    ],
    experience: [
      { id: "frontend", name: "Frontend Development", weight: 90, required: true },
      { id: "react-native", name: "React Native", weight: 40, required: false },
      { id: "team-lead", name: "Team Leadership", weight: 60, required: false },
    ],
    education: [
      { id: "cs-degree", name: "Computer Science Degree", weight: 50, required: false },
      { id: "bootcamp", name: "Coding Bootcamp", weight: 30, required: false },
    ],
    cultureAttributes: [
      { id: "teamwork", name: "Teamwork", weight: 70, required: false },
      { id: "communication", name: "Communication", weight: 80, required: true },
      { id: "problem-solving", name: "Problem Solving", weight: 90, required: true },
      { id: "adaptability", name: "Adaptability", weight: 60, required: false },
    ],
    diversityGoals: {
      enabled: false,
      targetGroups: [],
      priority: 30,
    },
    matchThreshold: 70,
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [matchSimulation, setMatchSimulation] = useState<null | { score: number; breakdown: Record<string, number> }>(
    null,
  )
  const { toast } = useToast()

  const handleItemWeightChange = (
    category: "skills" | "experience" | "education" | "cultureAttributes",
    id: string,
    value: number[],
  ) => {
    setConfig((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, weight: value[0] } : item)),
    }))
    setHasChanges(true)
  }

  const handleItemRequiredChange = (
    category: "skills" | "experience" | "education" | "cultureAttributes",
    id: string,
    required: boolean,
  ) => {
    setConfig((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, required } : item)),
    }))
    setHasChanges(true)
  }

  const handleMatchThresholdChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      matchThreshold: value[0],
    }))
    setHasChanges(true)
  }

  const handleDiversityGoalsChange = (field: "enabled" | "priority", value: boolean | number) => {
    setConfig((prev) => ({
      ...prev,
      diversityGoals: {
        ...prev.diversityGoals,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleDiversityTargetGroupChange = (group: string, selected: boolean) => {
    setConfig((prev) => {
      const currentGroups = prev.diversityGoals.targetGroups
      const updatedGroups = selected ? [...currentGroups, group] : currentGroups.filter((g) => g !== group)

      return {
        ...prev,
        diversityGoals: {
          ...prev.diversityGoals,
          targetGroups: updatedGroups,
        },
      }
    })
    setHasChanges(true)
  }

  const runMatchSimulation = () => {
    // In a real app, this would call an API to simulate matching with the current configuration
    // Here we'll generate a simulated result
    const totalWeights = {
      skills: config.skills.reduce((sum, item) => sum + item.weight, 0),
      experience: config.experience.reduce((sum, item) => sum + item.weight, 0),
      education: config.education.reduce((sum, item) => sum + item.weight, 0),
      cultureAttributes: config.cultureAttributes.reduce((sum, item) => sum + item.weight, 0),
    }

    const totalWeight = Object.values(totalWeights).reduce((sum, w) => sum + w, 0)

    // Generate random match scores for each category
    const categoryScores = {
      skills: Math.round(Math.random() * 100),
      experience: Math.round(Math.random() * 100),
      education: Math.round(Math.random() * 100),
      cultureAttributes: Math.round(Math.random() * 100),
    }

    // Weighted total score
    const weightedScores = {
      skills: (categoryScores.skills * totalWeights.skills) / totalWeight,
      experience: (categoryScores.experience * totalWeights.experience) / totalWeight,
      education: (categoryScores.education * totalWeights.education) / totalWeight,
      cultureAttributes: (categoryScores.cultureAttributes * totalWeights.cultureAttributes) / totalWeight,
    }

    const totalScore = Object.values(weightedScores).reduce((sum, score) => sum + score, 0)

    setMatchSimulation({
      score: Math.round(totalScore),
      breakdown: {
        skills: Math.round(categoryScores.skills),
        experience: Math.round(categoryScores.experience),
        education: Math.round(categoryScores.education),
        cultureAttributes: Math.round(categoryScores.cultureAttributes),
      },
    })

    toast({
      title: "Match Simulation Complete",
      description: "See the results of how your current configuration would match candidates.",
    })
  }

  const handleSave = () => {
    if (onSave) {
      onSave(config)
    }

    toast({
      title: "Configuration Saved",
      description: "Your matching algorithm configuration has been saved successfully.",
    })

    setHasChanges(false)
  }

  const handleReset = () => {
    // In a real application, this would reset to the last saved configuration
    toast({
      title: "Configuration Reset",
      description: "Your changes have been discarded and the configuration has been reset.",
    })

    setHasChanges(false)
  }

  const getThresholdColor = (value: number) => {
    if (value >= 80) return "text-green-400"
    if (value >= 60) return "text-brand-400"
    if (value >= 40) return "text-amber-400"
    return "text-red-400"
  }

  const getThresholdText = (value: number) => {
    if (value >= 80) return "High"
    if (value >= 60) return "Medium"
    if (value >= 40) return "Low"
    return "Very Low"
  }

  return (
    <Card className="bg-gradient-card glow-effect w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gradient-brand">Matching Algorithm Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              Customize how candidates are matched to this job position
            </CardDescription>
          </div>
          {jobId && <Badge className="bg-brand-500/20 text-brand-400 border-brand-700">Job ID: {jobId}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="criteria"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <Sliders className="mr-2 h-4 w-4" />
              Matching Criteria
            </TabsTrigger>
            <TabsTrigger
              value="culture"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <Heart className="mr-2 h-4 w-4" />
              Culture & Diversity
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Simulation & Threshold
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {/* Matching Criteria Tab */}
            <TabsContent value="criteria" className="space-y-6">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Skills</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Adjust the importance of each skill and specify if it's a must-have requirement
                  </p>

                  <div className="space-y-4">
                    {config.skills.map((skill) => (
                      <div key={skill.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <Label className="text-gray-300">{skill.name}</Label>
                        </div>
                        <div className="col-span-6">
                          <Slider
                            value={[skill.weight]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleItemWeightChange("skills", skill.id, value)}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-sm text-gray-300">{skill.weight}%</span>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <Checkbox
                            id={`required-${skill.id}`}
                            checked={skill.required}
                            onCheckedChange={(checked) => handleItemRequiredChange("skills", skill.id, !!checked)}
                          />
                          <Label htmlFor={`required-${skill.id}`} className="text-gray-300 text-sm">
                            Required
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Experience</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Configure how much each experience type matters for this position
                  </p>

                  <div className="space-y-4">
                    {config.experience.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <Label className="text-gray-300">{exp.name}</Label>
                        </div>
                        <div className="col-span-6">
                          <Slider
                            value={[exp.weight]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleItemWeightChange("experience", exp.id, value)}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-sm text-gray-300">{exp.weight}%</span>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <Checkbox
                            id={`required-${exp.id}`}
                            checked={exp.required}
                            onCheckedChange={(checked) => handleItemRequiredChange("experience", exp.id, !!checked)}
                          />
                          <Label htmlFor={`required-${exp.id}`} className="text-gray-300 text-sm">
                            Required
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Education</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Set the importance of educational background for candidates
                  </p>

                  <div className="space-y-4">
                    {config.education.map((edu) => (
                      <div key={edu.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <Label className="text-gray-300">{edu.name}</Label>
                        </div>
                        <div className="col-span-6">
                          <Slider
                            value={[edu.weight]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleItemWeightChange("education", edu.id, value)}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-sm text-gray-300">{edu.weight}%</span>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <Checkbox
                            id={`required-${edu.id}`}
                            checked={edu.required}
                            onCheckedChange={(checked) => handleItemRequiredChange("education", edu.id, !!checked)}
                          />
                          <Label htmlFor={`required-${edu.id}`} className="text-gray-300 text-sm">
                            Required
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Culture & Diversity Tab */}
            <TabsContent value="culture" className="space-y-6">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Culture Fit Attributes</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Define how important different cultural attributes are for your team
                  </p>

                  <div className="space-y-4">
                    {config.cultureAttributes.map((attr) => (
                      <div key={attr.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <Label className="text-gray-300">{attr.name}</Label>
                        </div>
                        <div className="col-span-6">
                          <Slider
                            value={[attr.weight]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleItemWeightChange("cultureAttributes", attr.id, value)}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-sm text-gray-300">{attr.weight}%</span>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <Checkbox
                            id={`required-${attr.id}`}
                            checked={attr.required}
                            onCheckedChange={(checked) =>
                              handleItemRequiredChange("cultureAttributes", attr.id, !!checked)
                            }
                          />
                          <Label htmlFor={`required-${attr.id}`} className="text-gray-300 text-sm">
                            Required
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-brand-400" />
                      <h3 className="text-lg font-medium text-white">Diversity Goals</h3>
                    </div>
                    <Switch
                      checked={config.diversityGoals.enabled}
                      onCheckedChange={(checked) => handleDiversityGoalsChange("enabled", checked)}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Enable and configure diversity goals for your recruiting efforts
                  </p>

                  {config.diversityGoals.enabled && (
                    <div className="space-y-4 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div>
                        <Label className="text-gray-300 mb-2 block">Target Groups</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Women in Tech",
                            "Veterans",
                            "Underrepresented Minorities",
                            "People with Disabilities",
                            "Career Changers",
                            "First Generation College Graduates",
                          ].map((group) => (
                            <div key={group} className="flex items-center space-x-2">
                              <Checkbox
                                id={`group-${group.replace(/\s+/g, "-").toLowerCase()}`}
                                checked={config.diversityGoals.targetGroups.includes(group)}
                                onCheckedChange={(checked) => handleDiversityTargetGroupChange(group, !!checked)}
                              />
                              <Label
                                htmlFor={`group-${group.replace(/\s+/g, "-").toLowerCase()}`}
                                className="text-gray-300 text-sm"
                              >
                                {group}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center">
                          <Label className="text-gray-300">Priority Level</Label>
                          <span className="text-sm text-gray-300">{config.diversityGoals.priority}%</span>
                        </div>
                        <Slider
                          value={[config.diversityGoals.priority]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => handleDiversityGoalsChange("priority", value[0])}
                          className="mt-2 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                        <p className="text-xs text-gray-400 mt-2">
                          This sets how much weight diversity factors have in the overall matching algorithm
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Simulation & Threshold Tab */}
            <TabsContent value="simulation" className="space-y-6">
              <div className="space-y-5">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-brand-400" />
                    <h3 className="text-lg font-medium text-white">Match Threshold</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-5">
                    Set the minimum match percentage required for candidates to be considered
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={cn("font-medium", getThresholdColor(config.matchThreshold))}>
                        {getThresholdText(config.matchThreshold)} ({config.matchThreshold}%)
                      </span>
                      <div className="w-32 h-6 rounded-full bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-blue-600"
                          style={{ width: `${config.matchThreshold}%` }}
                        ></div>
                      </div>
                    </div>
                    <Slider
                      value={[config.matchThreshold]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={handleMatchThresholdChange}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Inclusive</span>
                      <span>Balanced</span>
                      <span>Selective</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5 text-brand-400" />
                      <h3 className="text-lg font-medium text-white">Match Simulation</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={runMatchSimulation}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    Test your current configuration with simulated candidates
                  </p>

                  {matchSimulation ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-white">Overall Match Score</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={matchSimulation.score} className="w-32 h-2" />
                          <Badge
                            className={cn(
                              "font-medium",
                              matchSimulation.score >= config.matchThreshold
                                ? "bg-green-500/20 text-green-400 border-green-800"
                                : "bg-red-500/20 text-red-400 border-red-800",
                            )}
                          >
                            {matchSimulation.score}%
                          </Badge>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Category Breakdown</h4>

                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <Label className="text-gray-300 flex items-center">
                              <Code className="mr-2 h-4 w-4 text-brand-400" />
                              Skills
                            </Label>
                          </div>
                          <div className="col-span-7">
                            <Progress value={matchSimulation.breakdown.skills} className="h-2" />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-sm text-gray-300">{matchSimulation.breakdown.skills}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <Label className="text-gray-300 flex items-center">
                              <Briefcase className="mr-2 h-4 w-4 text-brand-400" />
                              Experience
                            </Label>
                          </div>
                          <div className="col-span-7">
                            <Progress value={matchSimulation.breakdown.experience} className="h-2" />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-sm text-gray-300">{matchSimulation.breakdown.experience}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <Label className="text-gray-300 flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4 text-brand-400" />
                              Education
                            </Label>
                          </div>
                          <div className="col-span-7">
                            <Progress value={matchSimulation.breakdown.education} className="h-2" />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-sm text-gray-300">{matchSimulation.breakdown.education}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <Label className="text-gray-300 flex items-center">
                              <Heart className="mr-2 h-4 w-4 text-brand-400" />
                              Culture Fit
                            </Label>
                          </div>
                          <div className="col-span-7">
                            <Progress value={matchSimulation.breakdown.cultureAttributes} className="h-2" />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-sm text-gray-300">
                              {matchSimulation.breakdown.cultureAttributes}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-brand-400 mr-2 mt-0.5" />
                          <p className="text-sm text-gray-300">
                            This simulation shows how your configuration would score candidates. Adjust your criteria
                            and threshold to find the right balance for your needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <BarChart className="h-16 w-16 text-gray-700 mb-4" />
                      <h4 className="text-lg font-medium text-white mb-2">No Simulation Data</h4>
                      <p className="text-sm text-gray-400 max-w-md">
                        Run a simulation to see how your current matching configuration would score candidates
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between space-x-4 pt-2 border-t border-gray-800">
        <div className="flex gap-1 items-center text-sm text-gray-400">
          {hasChanges ? (
            <>
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span>You have unsaved changes</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Configuration is up to date</span>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-gradient-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

