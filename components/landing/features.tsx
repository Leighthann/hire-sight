import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, Users, BarChart, Search, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our advanced algorithms analyze resumes to find the perfect candidates for your job openings.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce screening time by up to 75% with automated candidate evaluation and ranking.",
  },
  {
    icon: Users,
    title: "Better Candidates",
    description: "Identify high-quality candidates who might be overlooked by traditional screening methods.",
  },
  {
    icon: BarChart,
    title: "Data-Driven Insights",
    description: "Get detailed analytics on your hiring process and candidate pool to make informed decisions.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find candidates with specific skills, experience, or qualifications with powerful search tools.",
  },
  {
    icon: Shield,
    title: "Reduce Bias",
    description: "Our AI is designed to minimize unconscious bias in the candidate screening process.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-0"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Powerful Features for Modern Recruiters
          </h2>
          <p className="text-gray-400 text-lg">
            HireSight combines cutting-edge AI technology with intuitive design to transform your hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-brand-500/5"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

