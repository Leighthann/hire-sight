"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiApplicationCart } from "./multi-application-cart"
import { ApplicationTrackingDashboard } from "./application-tracking-dashboard"
import { InterviewScheduler } from "./interview-scheduler"
import { FeedbackManagement } from "./feedback-management"
import { CommunicationHub } from "./communication-hub"

export default function ApplicationManagementSystem() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">Application Management</h1>
        <p className="text-gray-400">Manage your job applications, interviews, and communications</p>
      </div>

      <Tabs defaultValue="cart" className="space-y-6">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger
            value="cart"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
          >
            Application Cart
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
          >
            Application Tracking
          </TabsTrigger>
          <TabsTrigger
            value="interviews"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
          >
            Interview Scheduler
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
          >
            Feedback Management
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
          >
            Communication Hub
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cart">
          <MultiApplicationCart />
        </TabsContent>

        <TabsContent value="tracking">
          <ApplicationTrackingDashboard />
        </TabsContent>

        <TabsContent value="interviews">
          <InterviewScheduler />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackManagement />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationHub />
        </TabsContent>
      </Tabs>
    </div>
  )
}

