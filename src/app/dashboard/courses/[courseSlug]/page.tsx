import { notFound, redirect } from "next/navigation"
import { Courses } from "@prisma/client"

import { Video } from "@/components/video"
import { LessonsSidebar } from "@/components/lessons-sidebar"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

async function getCourse(courseSlug: Courses["slug"]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return await db.courses.findFirst({
    where: {
      slug: courseSlug,
    }
  })
}

interface CoursePageProps {
  params: { courseSlug: string }
}

export default async function CoursePage({ params }:CoursePageProps) {
  const course = await getCourse(params.courseSlug)

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