"use client"

import { LoginForm } from "@/components/landing/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-brand-200">
                Find Your Perfect Candidates Faster with AI
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                HireSight uses advanced AI to match the right talent to your job openings, saving you time and improving
                hiring outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700"
                asChild
              >
                <Link href="/dashboard">For Recruiters</Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/candidate/dashboard">For Job Seekers</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">500+</span> recruiters already using HireSight
              </p>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

