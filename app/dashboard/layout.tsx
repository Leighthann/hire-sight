import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 md:flex-row">
        {/* Abstract Background Elements */}
        <div className="fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <DashboardSidebar />
        <div className="flex-1 md:ml-64 relative z-10">
          <main className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

