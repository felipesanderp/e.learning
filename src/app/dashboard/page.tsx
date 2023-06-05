import { redirect } from "next/navigation"
import { User } from "@prisma/client";

import { getCurrentUser } from "@/lib/session"
import { MyCourses } from "@/components/student/my-courses";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAnalytics } from "@/components/admin/analytics";
import { LatestCreatedUsers } from "@/components/admin/latest-created-users";
import { db } from "@/lib/db";
import { CoursesCard } from "@/components/courses-card";

export const metadata = {
  title: 'Dashboard | e.learning',
}

async function getMyCourses(userId: User['id']) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      enrollments: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
              imageURL: true,
              description: true,
              slug: true,
              createdAt: true,
            }
          }
        }
      }
    }
  })
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const myCourses = await getMyCourses(user.id)


  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {user.role === 'STUDENT' && (
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          )}
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

            {user.role === 'ADMIN' || user.role === 'PROFESSOR' ? (
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>
                    Latest created users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LatestCreatedUsers />
                </CardContent>
              </Card>
            ): ''}
          </div>
        </TabsContent>

        <TabsContent value="my-courses">
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-32 md:grid-cols-3 xl:grid-cols-3">
            {myCourses?.enrollments.map((courses) => (
              <CoursesCard
                key={courses.course.id}
                course={courses.course}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}