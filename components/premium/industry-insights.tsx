"use client"

import type React from "react"

import { useState } from "react"
import { DollarSign, Download, Filter, Globe, Info, MapPin, Share2, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for market intelligence
const skillDemandData = [
  { month: "Jan", react: 120, angular: 80, vue: 60 },
  { month: "Feb", react: 132, angular: 75, vue: 65 },
  { month: "Mar", react: 145, angular: 70, vue: 70 },
  { month: "Apr", react: 160, angular: 65, vue: 80 },
  { month: "May", react: 180, angular: 60, vue: 90 },
  { month: "Jun", react: 220, angular: 55, vue: 100 },
  { month: "Jul", react: 250, angular: 50, vue: 110 },
  { month: "Aug", react: 280, angular: 45, vue: 120 },
  { month: "Sep", react: 310, angular: 40, vue: 130 },
  { month: "Oct", react: 340, angular: 35, vue: 140 },
  { month: "Nov", react: 370, angular: 30, vue: 150 },
  { month: "Dec", react: 390, angular: 25, vue: 160 },
]

const salaryComparisonData = [
  { role: "Junior Developer", industry: 75000, yourSkills: 78000 },
  { role: "Mid-level Developer", industry: 95000, yourSkills: 102000 },
  { role: "Senior Developer", industry: 130000, yourSkills: 145000 },
  { role: "Lead Developer", industry: 160000, yourSkills: 172000 },
  { role: "Architect", industry: 180000, yourSkills: 195000 },
]

const geographicalData = [
  { city: "San Francisco", jobCount: 2500, avgSalary: 155000, growth: 15 },
  { city: "New York", jobCount: 2200, avgSalary: 145000, growth: 12 },
  { city: "Seattle", jobCount: 1800, avgSalary: 150000, growth: 18 },
  { city: "Austin", jobCount: 1500, avgSalary: 130000, growth: 25 },
  { city: "Boston", jobCount: 1200, avgSalary: 140000, growth: 10 },
  { city: "Chicago", jobCount: 1100, avgSalary: 125000, growth: 8 },
  { city: "Los Angeles", jobCount: 1000, avgSalary: 135000, growth: 14 },
  { city: "Denver", jobCount: 900, avgSalary: 120000, growth: 20 },
]

const emergingSkillsData = [
  { name: "AI/ML", value: 35, growth: 45, color: "#3b82f6" },
  { name: "Web3", value: 20, growth: 30, color: "#10b981" },
  { name: "AR/VR", value: 15, growth: 25, color: "#f59e0b" },
  { name: "Cybersecurity", value: 25, growth: 35, color: "#6366f1" },
  { name: "Cloud Native", value: 30, growth: 40, color: "#ec4899" },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ec4899"]

export function IndustryInsights() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1y")

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Industry Insights Dashboard</h2>
        <p className="text-muted-foreground">Market intelligence and trends to guide your career decisions.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="2y">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="demand-trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demand-trends">Demand Trends</TabsTrigger>
          <TabsTrigger value="salary-benchmarks">Salary Benchmarks</TabsTrigger>
          <TabsTrigger value="geographical">Geographical Data</TabsTrigger>
          <TabsTrigger value="emerging-skills">Emerging Skills</TabsTrigger>
        </TabsList>

        {/* Demand Trends Tab */}
        <TabsContent value="demand-trends" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Skill Demand Trends</CardTitle>
                  <CardDescription>Job posting trends for popular frontend frameworks</CardDescription>
                </div>
                <Select defaultValue="frontend">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Skill Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    react: {
                      label: "React",
                      color: "hsl(var(--chart-1))",
                    },
                    angular: {
                      label: "Angular",
                      color: "hsl(var(--chart-2))",
                    },
                    vue: {
                      label: "Vue",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={skillDemandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="react"
                        stroke="var(--color-react)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="angular"
                        stroke="var(--color-angular)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="vue"
                        stroke="var(--color-vue)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">React</h4>
                    <Badge className="bg-green-600">+225%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Year-over-year growth</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span>Strong upward trend</span>
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Angular</h4>
                    <Badge className="bg-red-600">-68%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Year-over-year decline</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <span>Consistent downward trend</span>
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Vue</h4>
                    <Badge className="bg-green-600">+166%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Year-over-year growth</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span>Steady growth trajectory</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                View Detailed Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Salary Benchmarks Tab */}
        <TabsContent value="salary-benchmarks" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Salary Benchmark Comparison</CardTitle>
                  <CardDescription>Your potential earnings compared to industry averages</CardDescription>
                </div>
                <Select defaultValue="tech">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    industry: {
                      label: "Industry Average",
                      color: "hsl(var(--chart-1))",
                    },
                    yourSkills: {
                      label: "Your Skills Potential",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryComparisonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="role" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="industry" fill="var(--color-industry)" barSize={20} />
                      <Bar dataKey="yourSkills" fill="var(--color-yourSkills)" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <h4 className="font-medium">Your Salary Potential</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Based on your current skills and experience</p>
                  <div className="text-2xl font-bold text-green-400">$102,000</div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Badge className="bg-green-600">+7.4%</Badge>
                    <span>Above industry average</span>
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <h4 className="font-medium">Skill Enhancement Impact</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Potential salary increase with additional skills</p>
                  <div className="text-2xl font-bold text-blue-400">+$15,000-25,000</div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Badge className="bg-blue-600">+15-25%</Badge>
                    <span>With targeted skill acquisition</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Info className="h-4 w-4" />
                      Methodology
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      Salary data is aggregated from job postings, employer surveys, and verified user reports across
                      the industry.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                View Personalized Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Geographical Data Tab */}
        <TabsContent value="geographical" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Geographical Opportunity Heatmap</CardTitle>
                  <CardDescription>Job opportunities and salary data by location</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="us">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia Pacific</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] mb-6 bg-blue-950/10 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-blue-400 mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground">Interactive map visualization</p>
                    <Button size="sm" className="mt-2">
                      Load Map
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Location</th>
                      <th className="text-left py-3 px-4">Job Openings</th>
                      <th className="text-left py-3 px-4">Avg. Salary</th>
                      <th className="text-left py-3 px-4">Growth Rate</th>
                      <th className="text-left py-3 px-4">Remote %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geographicalData.map((location, index) => (
                      <tr key={index} className="border-b border-border hover:bg-blue-950/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-400" />
                            {location.city}
                          </div>
                        </td>
                        <td className="py-3 px-4">{location.jobCount.toLocaleString()}</td>
                        <td className="py-3 px-4">${location.avgSalary.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Badge className={location.growth > 15 ? "bg-green-600" : "bg-blue-600"}>
                              {location.growth}%
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4">{index % 2 === 0 ? "65%" : "45%"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter Locations
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                View Remote Opportunities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Emerging Skills Tab */}
        <TabsContent value="emerging-skills" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Emerging Skills Forecast</CardTitle>
                  <CardDescription>High-growth skills to consider for your career development</CardDescription>
                </div>
                <Select defaultValue="tech">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={emergingSkillsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emergingSkillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Top Emerging Skills</h3>
                  {emergingSkillsData.map((skill, index) => (
                    <div key={index} className="bg-blue-950/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></div>
                          <h4 className="font-medium">{skill.name}</h4>
                        </div>
                        <Badge className="bg-green-600">+{skill.growth}%</Badge>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Market Demand</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="w-full bg-blue-950/30 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${skill.value}%`, backgroundColor: skill.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Strategic Skill Acquisition</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your current skills and career goals, we recommend focusing on{" "}
                      <span className="text-blue-400 font-medium">AI/ML</span> and{" "}
                      <span className="text-blue-400 font-medium">Cloud Native</span> technologies to maximize your
                      market value over the next 2-3 years.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                View All Skills
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                Get Personalized Recommendations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component definition
function TrendingDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}

// Missing component definition
function Lightbulb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

