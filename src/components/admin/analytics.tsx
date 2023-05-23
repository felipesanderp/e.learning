import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminAnalyticsProps {
  totalStudents: number
  totalProfessors: number
}

export function AdminAnalytics({ totalStudents, totalProfessors }:AdminAnalyticsProps ) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Professors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProfessors}</div>
        </CardContent>
      </Card>
    </div> 
  )
}