import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-12" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
