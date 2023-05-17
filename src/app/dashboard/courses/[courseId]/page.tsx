import { notFound, redirect } from "next/navigation"
import { Courses } from "@prisma/client"

import { Video } from "@/components/video"
import { LessonsSidebar } from "@/components/lessons-sidebar"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

async function getCourse(courseId: Courses["id"]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return await db.courses.findFirst({
    where: {
      id: courseId,
    }
  })
}

interface CoursePageProps {
  params: { courseId: string }
}

export default async function CoursePage({ params }:CoursePageProps) {
  const course = await getCourse(params.courseId)

  if (!course) {
    notFound()
  }

  return (
    <main className="flex flex-1">
      <Video />
      <LessonsSidebar />
    </main>
  )
}