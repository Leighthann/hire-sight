"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

// Mock data - in a real app, this would come from your API
const mockCandidate = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  matchScore: 92,
  appliedFor: "Senior Frontend Developer",
  appliedDate: "2023-05-15",
  resumeUrl: "#",
  skills: [
    { name: "React", match: true, relevance: 95 },
    { name: "TypeScript", match: true, relevance: 90 },
    { name: "Node.js", match: true, relevance: 85 },
    { name: "GraphQL", match: true, relevance: 80 },
    { name: "AWS", match: false, relevance: 60 },
    { name: "Docker", match: false, relevance: 50 },
  ],
  experience: [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      duration: "2020 - Present",
      relevance: 90,
      highlights: [
        "Developed responsive web applications using React and TypeScript",
        "Implemented state management with Redux and Context API",
        "Collaborated with UX designers to implement pixel-perfect designs",
      ],
    },
    {
      title: "Junior Developer",
      company: "Digital Innovations",
      duration: "2018 - 2020",
      relevance: 75,
      highlights: [
        "Built and maintained client websites using JavaScript and CSS",
        "Assisted in the development of a company-wide component library",
        "Participated in code reviews and pair programming sessions",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University of California, Berkeley",
      year: "2018",
      relevance: 85,
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Coding Academy",
      year: "2019",
      relevance: 90,
    },
  ],
  aiAnalysis: {
    summary:
      "Alex is a strong candidate with extensive experience in frontend development, particularly with React and TypeScript. The candidate's skills align well with the job requirements, and their experience at Tech Solutions Inc. demonstrates relevant project work.",
    strengths: [
      "Strong proficiency in React and TypeScript",
      "Experience with modern state management approaches",
      "Collaborative approach with designers",
    ],
    gaps: [
      "Limited experience with AWS and cloud infrastructure",
      "No mention of testing frameworks or methodologies",
    ],
    recommendation: "Highly Recommended",
  },
};

export default function CandidateDetailPage() {
    const params = useParams(); // Get dynamic route parameters
    const id = params?.id as string; // Ensure ID is a string
    const [loading, setLoading] = useState(true);
    const [candidate, setCandidate] = useState<typeof mockCandidate | null>(
      null
    );
    useEffect(() => {
      // Simulate API loading
      const timer = setTimeout(() => {
        setCandidate(mockCandidate);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[300px] rounded-lg" />
            <Skeleton className="h-[300px] rounded-lg" />
          </div>
        </div>
      );
    }

    if (!candidate) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-2 text-lg font-semibold">Candidate Not Found</h2>
            <p className="text-muted-foreground">
              The candidate you're looking for doesn't exist or has been
              removed.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/candidates">Back to Candidates</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/candidates">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {candidate.name}
              </h1>
              <p className="text-muted-foreground">
                Applied for {candidate.appliedFor}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <a href={candidate.resumeUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Contact Candidate
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Candidate Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {candidate.experience[0].title}
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {candidate.matchScore}% Match
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    Applied on{" "}
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h4 className="text-sm font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={skill.match ? "default" : "outline"}
                      className="flex items-center gap-1"
                    >
                      {skill.name}
                      {skill.match && <CheckCircle className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Automated assessment of candidate's fit for the role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">{candidate.aiAnalysis.summary}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">Strengths</h4>
                      <ul className="space-y-1">
                        {candidate.aiAnalysis.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Improvement Areas</h4>
                      <ul className="space-y-1">
                        {candidate.aiAnalysis.gaps.map((gap, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Recommendation</h4>
                      <Badge
                        variant={
                          candidate.aiAnalysis.recommendation ===
                          "Highly Recommended"
                            ? "default"
                            : candidate.aiAnalysis.recommendation ===
                              "Recommended"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {candidate.aiAnalysis.recommendation}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="skills" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    {candidate.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {skill.match ? (
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="mr-2 h-4 w-4 text-gray-400" />
                            )}
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.relevance}% Relevance
                          </span>
                        </div>
                        <Progress value={skill.relevance} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="experience" className="space-y-6 pt-4">
                  {candidate.experience.map((exp, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{exp.title}</h4>
                        <Badge variant="outline">
                          {exp.relevance}% Relevant
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-2 h-4 w-4" />
                        {exp.company} • {exp.duration}
                      </div>
                      <ul className="ml-6 list-disc space-y-1 text-sm">
                        {exp.highlights.map((highlight, j) => (
                          <li key={j}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="education" className="space-y-6 pt-4">
                  {candidate.education.map((edu, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <Badge variant="outline">
                          {edu.relevance}% Relevant
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {edu.institution} • {edu.year}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] items-center justify-center rounded-lg border bg-muted">
              <div className="text-center">
                <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Resume Preview</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preview not available. Download the resume to view it.
                </p>
                <Button className="mt-4" asChild>
                  <a href={candidate.resumeUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
