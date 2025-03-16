"use client"

import type React from "react"

import { useState } from "react"
import {
  Archive,
  ArrowUpRight,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  Filter,
  Mail,
  MailCheck,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Star,
  Tag,
  User,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for talent pool
const talentPoolData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    status: "Active",
    tags: ["React", "TypeScript", "Remote"],
    lastContact: "2 days ago",
    matchScore: 92,
    stage: "Interview",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Engineer",
    status: "Active",
    tags: ["Node.js", "React", "AWS"],
    lastContact: "1 week ago",
    matchScore: 88,
    stage: "Screening",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX/UI Designer",
    status: "Passive",
    tags: ["Figma", "User Research", "Remote"],
    lastContact: "3 weeks ago",
    matchScore: 85,
    stage: "Nurturing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Backend Developer",
    status: "Active",
    tags: ["Python", "Django", "PostgreSQL"],
    lastContact: "5 days ago",
    matchScore: 79,
    stage: "Applied",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Data Scientist",
    status: "Passive",
    tags: ["Python", "Machine Learning", "SQL"],
    lastContact: "1 month ago",
    matchScore: 76,
    stage: "Nurturing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for nurture campaigns
const nurtureCampaigns = [
  {
    id: 1,
    name: "Tech Conference Follow-up",
    status: "Active",
    candidates: 24,
    engagement: 68,
    lastUpdated: "2 days ago",
    steps: 4,
  },
  {
    id: 2,
    name: "Quarterly Check-in",
    status: "Active",
    candidates: 56,
    engagement: 72,
    lastUpdated: "1 week ago",
    steps: 3,
  },
  {
    id: 3,
    name: "Previous Applicants",
    status: "Draft",
    candidates: 112,
    engagement: 0,
    lastUpdated: "3 days ago",
    steps: 5,
  },
]

// Mock data for engagement metrics
const engagementData = [
  { month: "Jan", emails: 120, responses: 65, meetings: 12 },
  { month: "Feb", emails: 132, responses: 78, meetings: 18 },
  { month: "Mar", emails: 145, responses: 90, meetings: 24 },
  { month: "Apr", emails: 160, responses: 105, meetings: 28 },
  { month: "May", emails: 180, responses: 112, meetings: 32 },
  { month: "Jun", emails: 220, responses: 135, meetings: 36 },
  { month: "Jul", emails: 250, responses: 150, meetings: 42 },
]

// Mock data for re-engagement
const previousApplicants = [
  {
    id: 1,
    name: "James Wilson",
    role: "Frontend Developer",
    appliedDate: "2022-11-15",
    status: "Rejected - Final Round",
    reason: "Experience level",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sophia Garcia",
    role: "Product Manager",
    appliedDate: "2023-01-22",
    status: "Rejected - Technical Interview",
    reason: "Technical skills",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Raj Patel",
    role: "DevOps Engineer",
    appliedDate: "2022-09-05",
    status: "Withdrew",
    reason: "Accepted another offer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CandidateRelationship() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCandidates = talentPoolData.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Candidate Relationship Management</h2>
        <p className="text-muted-foreground">
          Organize your talent pool and nurture relationships with potential candidates.
        </p>
      </div>

      <Tabs defaultValue="talent-pool" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="talent-pool">Talent Pool</TabsTrigger>
          <TabsTrigger value="nurture-campaigns">Nurture Campaigns</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
          <TabsTrigger value="re-engagement">Re-engagement</TabsTrigger>
        </TabsList>

        {/* Talent Pool Tab */}
        <TabsContent value="talent-pool" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates, skills, or tags..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add Candidate
              </Button>
            </div>
          </div>

          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Talent Pool</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Candidates</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="passive">Passive</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>{filteredCandidates.length} candidates in your talent pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedCandidate === candidate.id
                        ? "bg-blue-950/30 border border-blue-500/50"
                        : "hover:bg-blue-950/20 border border-transparent"
                    }`}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-950/50">
                          <img
                            src={candidate.avatar || "/placeholder.svg"}
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            candidate.status === "Active"
                              ? "bg-green-600"
                              : candidate.status === "Passive"
                                ? "bg-blue-600"
                                : "bg-yellow-600"
                          }
                        >
                          {candidate.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <User className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Tag className="h-4 w-4 mr-2" />
                              Manage Tags
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-500">
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {candidate.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-950/30 text-blue-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Last contact: {candidate.lastContact}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500" />
                        <span>Match: {candidate.matchScore}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCandidate && (
                <div className="mt-4 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium">Quick Actions</h3>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      View Full Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" size="sm" className="gap-1 justify-start">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 justify-start">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 justify-start">
                      <Tag className="h-4 w-4" />
                      Add to Campaign
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Label htmlFor="quick-note" className="text-sm">
                      Add a quick note
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Textarea
                        id="quick-note"
                        placeholder="Type a note about this candidate..."
                        className="min-h-[60px]"
                      />
                      <Button size="icon" className="h-full aspect-square bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export List
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Bulk Actions
                </Button>
                <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Segment
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Nurture Campaigns Tab */}
        <TabsContent value="nurture-campaigns" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>

          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Nurture Campaigns</CardTitle>
              <CardDescription>Automated communication sequences to engage with your talent pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nurtureCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-border/40 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-medium">{campaign.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{campaign.candidates} candidates</span>
                          <span>•</span>
                          <span>{campaign.steps} steps</span>
                          <span>•</span>
                          <span>Updated {campaign.lastUpdated}</span>
                        </div>
                      </div>
                      <Badge
                        className={
                          campaign.status === "Active"
                            ? "bg-green-600"
                            : campaign.status === "Draft"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-950/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MailCheck className="h-5 w-5 text-blue-400" />
                          <h5 className="font-medium">Engagement Rate</h5>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{campaign.engagement}%</span>
                        </div>
                        <Progress value={campaign.engagement} className="h-1.5" />
                      </div>

                      <div className="bg-blue-950/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-blue-400" />
                          <h5 className="font-medium">Candidate Pool</h5>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-2xl font-bold text-blue-400">{campaign.candidates}</span>
                          <span className="text-muted-foreground">candidates in campaign</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Edit Campaign
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Plus className="h-4 w-4" />
                          Add Candidates
                        </Button>
                        <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                          <ChevronRight className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Campaign Best Practices</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Nurture campaigns with 4-5 touchpoints over 2-3 months tend to have the highest engagement rates.
                      Personalized content increases response rates by up to 30%.
                    </p>
                    <Button size="sm" variant="outline" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      View Campaign Guide
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Metrics Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Engagement Tracking Metrics</CardTitle>
                  <CardDescription>Monitor candidate engagement with your outreach efforts</CardDescription>
                </div>
                <Select defaultValue="6m">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    emails: {
                      label: "Emails Sent",
                      color: "hsl(var(--chart-1))",
                    },
                    responses: {
                      label: "Responses",
                      color: "hsl(var(--chart-2))",
                    },
                    meetings: {
                      label: "Meetings",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="emails"
                        stroke="var(--color-emails)"
                        fill="var(--color-emails)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="responses"
                        stroke="var(--color-responses)"
                        fill="var(--color-responses)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="meetings"
                        stroke="var(--color-meetings)"
                        fill="var(--color-meetings)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <h5 className="font-medium">Email Metrics</h5>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Open Rate</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Rate</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Click Rate</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-1.5" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <h5 className="font-medium">Messaging Effectiveness</h5>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Personalized</span>
                      <Badge className="bg-green-600">+45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Skill-specific</span>
                      <Badge className="bg-green-600">+38%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Generic</span>
                      <Badge className="bg-red-600">-22%</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <h5 className="font-medium">Meeting Conversion</h5>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">16.8%</div>
                  <p className="text-sm text-muted-foreground">Percentage of outreach that results in a meeting</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge className="bg-green-600">+3.2%</Badge>
                    <span className="text-sm">vs previous period</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                More Metrics
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Re-engagement Tab */}
        <TabsContent value="re-engagement" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Re-engagement Tools</CardTitle>
              <CardDescription>Reconnect with previous applicants and passive candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Previous Applicants</h3>
                  <div className="space-y-3">
                    {previousApplicants.map((applicant) => (
                      <div key={applicant.id} className="border border-border/40 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-950/50">
                              <img
                                src={applicant.avatar || "/placeholder.svg"}
                                alt={applicant.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{applicant.name}</h4>
                              <p className="text-sm text-muted-foreground">{applicant.role}</p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                              {applicant.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Reason: {applicant.reason}</span>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="gap-1">
                            <User className="h-4 w-4" />
                            View Profile
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Mail className="h-4 w-4" />
                              Send Email
                            </Button>
                            <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                              <Plus className="h-4 w-4" />
                              Add to Campaign
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Re-engagement Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-border/40 bg-background/95">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">New Opportunity</CardTitle>
                        <CardDescription>For candidates who were close to an offer</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          "We have a new role that matches your skills. Would you be interested in discussing this
                          opportunity?"
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full gap-1">
                          <Mail className="h-4 w-4" />
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-border/40 bg-background/95">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Check-In</CardTitle>
                        <CardDescription>For passive candidates in your network</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          "Checking in to see how you're doing in your current role and if you'd be open to new
                          opportunities."
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full gap-1">
                          <Mail className="h-4 w-4" />
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-border/40 bg-background/95">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Company Update</CardTitle>
                        <CardDescription>Share news and growth with past candidates</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          "We've grown significantly since we last spoke and have exciting new opportunities that might
                          interest you."
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full gap-1">
                          <Mail className="h-4 w-4" />
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter Candidates
              </Button>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Bell className="h-4 w-4" />
                Set Re-engagement Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component definition
function Download(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
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

// Missing component definition
function BookOpen(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

