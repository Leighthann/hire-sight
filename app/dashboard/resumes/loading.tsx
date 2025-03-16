import { Skeleton } from "@/components/ui/skeleton"

export default function ResumesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  )
}

