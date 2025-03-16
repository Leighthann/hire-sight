import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-12 w-64 mb-4" />
      <Skeleton className="h-8 w-full max-w-2xl mb-6" />

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl p-6">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-md mb-6" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl p-6">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-md mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </Card>
      </div>
    </div>
  )
}

