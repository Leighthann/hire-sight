import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Briefcase, ShoppingCart, ArrowRight } from "lucide-react"

export default function CandidateLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col">
      {/* Simple header */}
      <header className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-blue-400">
              HireSight
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-brand-200">
              Find Your Dream Job with HireSight
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create your profile, upload your resume, and let our AI match you with the perfect opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card glow-effect">
              <CardHeader>
                <CardTitle className="text-gradient-brand">New to HireSight?</CardTitle>
                <CardDescription className="text-gray-400">
                  Create an account and start your job search journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Join thousands of job seekers who have found their perfect match with HireSight's AI-powered platform.
                </p>
                <Button asChild className="w-full bg-gradient-primary">
                  <Link href="/register?type=candidate">
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card glow-effect">
              <CardHeader>
                <CardTitle className="text-gradient-brand">Already a Member?</CardTitle>
                <CardDescription className="text-gray-400">
                  Sign in to access your dashboard and applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Continue your job search, check application status, and discover new opportunities.
                </p>
                <Button asChild className="w-full bg-gradient-primary">
                  <Link href="/candidate/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white text-center">What You Can Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/80 transition-colors">
                <User className="h-8 w-8 text-brand-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Create Your Profile</h3>
                <p className="text-gray-400">
                  Build a comprehensive profile that showcases your skills and experience.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/80 transition-colors">
                <Briefcase className="h-8 w-8 text-brand-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Discover Opportunities</h3>
                <p className="text-gray-400">Browse personalized job recommendations based on your profile.</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/80 transition-colors">
                <ShoppingCart className="h-8 w-8 text-brand-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Apply with Ease</h3>
                <p className="text-gray-400">Apply to multiple jobs at once with our convenient application cart.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HireSight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

