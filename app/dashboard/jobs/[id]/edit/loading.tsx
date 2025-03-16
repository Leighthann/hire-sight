import { Skeleton } from "@/components/ui/skeleton"

export default function EditJobLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  )
}

