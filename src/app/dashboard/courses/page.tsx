import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { CoursesCard } from "@/components/courses-card";
import { CreateCourseForm } from "@/components/create-course-form";

export const metadata = {
  title: 'Cursos | e.learning',
}

export default async function CoursesPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect("/dashboard")
  }

  const courses = await db.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageURL: true,
      slug: true,
      createdAt: true,
      lessons: {
        select: {
          id: true
        }
      }
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
        heading="Cursos"
        text="Crie e gerencie cursos."
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateCourseForm 
            lessons={lessons}
          /> : ''
        }
      </DashboardHeader>
      
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-3">
        {courses.map((course) => (
          <CoursesCard 
            key={course.id}
            course={course}
            lesson={course.lessons}
            user={user}
          />
        ))}
      </div>
    </DashboardShell>
  )
}