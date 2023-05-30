import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { MyCourses } from "@/components/my-courses";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAnalytics } from "@/components/admin/analytics";

export const metadata = {
  title: 'Dashboard | e.learning',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-courses" disabled>My Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div>
            {user.role === "ADMIN" || user.role === "PROFESSOR" ? (
              <AdminAnalytics />
            ): ''}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  My Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MyCourses />
              </CardContent>
            </Card>
          </div>

        </TabsContent>
      </Tabs>
    </div>
  )
}