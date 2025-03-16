"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumeScannerInterface } from "@/components/ai-matching/resume-scanner"
import { MatchingConfigurator } from "@/components/ai-matching/matching-configurator"
import { MatchExplanation } from "@/components/ai-matching/match-explanation"
import { JobRecommendationCard } from "@/components/ai-matching/job-recommendation-card"
import { CandidateRecommendationCard } from "@/components/ai-matching/candidate-recommendation-card"
import { FeedbackSystem } from "@/components/ai-matching/feedback-system"

// Example job recommendation data
const exampleJobRecommendation = {
  id: "job123",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "Remote",
  salary: "$120,000 - $150,000",
  postedDate: "2025-03-10",
  matchScore: 92,
  isPremium: true,
  reasonForRecommendation:
    "Your experience with React and TypeScript closely matches the job requirements. Your portfolio projects demonstrate the exact kind of UI work they're looking for.",
  matchingSkills: ["React", "TypeScript", "Next.js", "UI Design"],
}

// Example candidate recommendation data
const exampleCandidateRecommendation = {
  id: "cand456",
  name: "Alex Johnson",
  title: "Senior Frontend Developer",
  location: "San Francisco, CA",
  experience: "5+ years",
  appliedDate: "2025-03-12",
  matchScore: 95,
  isPremium: true,
  reasonForRecommendation:
    "Alex's skills in React and TypeScript are exactly what the position requires. They also have experience leading frontend teams which matches your team leadership requirement.",
  highlightedSkills: ["React", "TypeScript", "Team Leadership", "UI/UX"],
  education: "B.S. Computer Science",
}

export function AIMatchingSystemDemo() {
  const [activeTab, setActiveTab] = useState("resume-scanner")

  return (
    <div className="space-y-8 mx-auto max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-gray-700">
          <TabsTrigger
            value="resume-scanner"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Resume Scanner
          </TabsTrigger>
          <TabsTrigger
            value="matching-config"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Matching Config
          </TabsTrigger>
          <TabsTrigger
            value="match-explanation"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Match Details
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Recommendations
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Feedback
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="resume-scanner">
            <ResumeScannerInterface onComplete={(data) => console.log("Resume data:", data)} />
          </TabsContent>

          <TabsContent value="matching-config">
            <MatchingConfigurator jobId="job123" onSave={(config) => console.log("Saved config:", config)} />
          </TabsContent>

          <TabsContent value="match-explanation">
            <MatchExplanation
              candidateId="cand456"
              jobId="job123"
              matchScore={92}
              candidateName="Alex Johnson"
              jobTitle="Senior Frontend Developer"
              onFeedback={(feedback) => console.log("Match feedback:", feedback)}
            />
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Recommendation Cards</h2>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">For Candidates</h3>
                <JobRecommendationCard
                  job={exampleJobRecommendation}
                  onSave={(id) => console.log("Saved job:", id)}
                  onAddToCart={(id) => console.log("Added to cart:", id)}
                  onMoreLikeThis={(id) => console.log("More like:", id)}
                  onDismiss={(id) => console.log("Dismissed:", id)}
                  onFeedback={(id, type) => console.log("Feedback:", id, type)}
                />
              </div>

              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium text-white">For Recruiters</h3>
                <CandidateRecommendationCard
                  candidate={exampleCandidateRecommendation}
                  jobTitle="Senior Frontend Developer"
                  onContact={(id) => console.log("Contact:", id)}
                  onViewProfile={(id) => console.log("View profile:", id)}
                  onViewMatch={(id) => console.log("View match:", id)}
                  onMoreLikeThis={(id) => console.log("More like:", id)}
                  onDismiss={(id) => console.log("Dismissed:", id)}
                  onFeedback={(id, type) => console.log("Feedback:", id, type)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">For Candidates</h3>
                  <FeedbackSystem
                    userType="candidate"
                    onFeedbackSubmit={(feedback) => console.log("Candidate feedback:", feedback)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">For Recruiters</h3>
                  <FeedbackSystem
                    userType="recruiter"
                    onFeedbackSubmit={(feedback) => console.log("Recruiter feedback:", feedback)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

