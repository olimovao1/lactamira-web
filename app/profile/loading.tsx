import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Skeleton className="h-[450px] w-full rounded-lg" />
        </div>

        <div className="md:col-span-2">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>

      <Skeleton className="h-[350px] w-full rounded-lg mt-8" />
    </div>
  )
}
