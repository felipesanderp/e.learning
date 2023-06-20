import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EditCourseSkeleton() {
  return (
    <div className="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-6">
      <Card className="md:col-span-4">
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/5" />
        </CardHeader>
        <CardContent className="h-10" />
        <CardFooter>
          <Skeleton className="h-8 w-[120px]" />
        </CardFooter>
      </Card>
    </div>
  )
}