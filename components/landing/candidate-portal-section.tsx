import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, FileText, Briefcase, ShoppingCart, Star, ArrowRight } from "lucide-react"

export function CandidatePortalSection() {
  return (
    <section id="candidate-portal" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-0"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            For Job Seekers
          </h2>
          <p className="text-gray-400 text-lg">
            Discover your perfect job match with our AI-powered candidate portal. Create your profile, upload your
            resume, and let our technology do the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Candidate Portal Features</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Profile Creation Wizard</h4>
                  <p className="text-gray-400">Create your professional profile with our step-by-step wizard</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">AI Resume Analysis</h4>
                  <p className="text-gray-400">Get insights on your skills, experience, and profile strength</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mr-4">
                  <Briefcase className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Personalized Job Recommendations</h4>
                  <p className="text-gray-400">Discover jobs that match your skills and preferences</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mr-4">
                  <ShoppingCart className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Multi-Application Cart</h4>
                  <p className="text-gray-400">Apply to multiple jobs at once with our convenient cart system</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mr-4">
                  <Star className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Premium Visibility Options</h4>
                  <p className="text-gray-400">Boost your profile visibility to stand out to recruiters</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700"
              >
                <Link href="/candidate/dashboard">
                  Access Candidate Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
            <Card className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/candidate-portal-preview.png"
                  alt="Candidate Portal Preview"
                  className="w-full h-auto"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                          H
                        </div>
                        <span className="text-xl font-bold text-white">HireSight</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

