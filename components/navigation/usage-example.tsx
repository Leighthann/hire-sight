"use client"

import { useState } from "react"
import { UnifiedNavigation } from "./unified-navigation"
import { UserOnboarding } from "../onboarding/user-onboarding"
import { SystemSettings } from "../settings/system-settings"
import { CrossPlatformSync } from "../sync/cross-platform-sync"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NavigationSystemExample() {
  const [userRole, setUserRole] = useState<"candidate" | "recruiter">("recruiter")
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <UnifiedNavigation />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-gradient">Navigation & System Components</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setUserRole("recruiter")}
                className={`px-3 py-1 text-sm rounded-md ${userRole === "recruiter" ? "bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Recruiter View
              </button>
              <button
                onClick={() => setUserRole("candidate")}
                className={`px-3 py-1 text-sm rounded-md ${userRole === "candidate" ? "bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Candidate View
              </button>
              <button
                onClick={() => setShowOnboarding(!showOnboarding)}
                className="px-3 py-1 text-sm rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
              >
                {showOnboarding ? "Hide" : "Show"} Onboarding
              </button>
            </div>
          </div>

          {showOnboarding && (
            <div className="mb-6">
              <UserOnboarding userRole={userRole} onComplete={() => setShowOnboarding(false)} />
            </div>
          )}
        </div>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              System Settings
            </TabsTrigger>
            <TabsTrigger
              value="sync"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            >
              Cross-Platform Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="sync">
            <CrossPlatformSync />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

