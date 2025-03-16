import { CandidateLayout } from "@/components/candidate/layout/candidate-layout"
import { ProfileWizard } from "@/components/candidate/profile/profile-wizard"
import { ResumeAnalysis } from "@/components/candidate/resume/resume-analysis"
import { JobRecommendations } from "@/components/candidate/jobs/job-recommendations"
import { ApplicationCart } from "@/components/candidate/cart/application-cart"
import { PremiumControls } from "@/components/candidate/premium/premium-controls"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CandidateDashboardPage() {
  return (
    <CandidateLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">Candidate Dashboard</h1>
          <p className="text-gray-400">Manage your profile and job applications</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Profile Setup
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Resume Analysis
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Job Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="queue"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Application Queue
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Premium Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileWizard />
          </TabsContent>

          <TabsContent value="analysis">
            <ResumeAnalysis />
          </TabsContent>

          <TabsContent value="jobs">
            <JobRecommendations />
          </TabsContent>

          <TabsContent value="queue">
            <ApplicationCart />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumControls />
          </TabsContent>
        </Tabs>
      </div>
    </CandidateLayout>
  )
}

