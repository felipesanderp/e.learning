import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { CreateCourse } from "@/components/create-course";
import { CoursesCard } from "@/components/courses-card";
import { CreateCourseForm } from "@/components/create-course-form";

export const metadata = {
  title: 'Courses | e.learning',
}

export default async function CoursesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const courses = await db.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageURL: true,
      slug: true,
    },
  })

  const lessons = await db.lessons.findMany({
    select: {
      id: true,
      name: true,
    }
  })
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Courses"
        text={user?.role === "ADMIN" || user?.role === 'PROFESSOR' ? "Create and manage courses." : "See the available courses."}
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateCourseForm 
            lessons={lessons}
          /> : ''
        }
      </DashboardHeader>
      
      <div className="container grid gap-y-4 w-full lg:grid-cols-4">
        {courses.map((course) => (
          <CoursesCard 
            key={course.id}
            course={course}
            user={user}
          />
        ))}
      </div>
    </DashboardShell>
  )
}