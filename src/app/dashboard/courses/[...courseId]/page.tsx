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

  return await db.courses.findUnique({
    where: {
      id: courseId
    },
    select: {
      id: true,
      title: true,
      lessons: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          video_id: true,
        }
      }
    }
  })
}

interface CoursePageProps {
  params: { 
    courseId: [
      course: string,
      lessonSlug: string
    ] 
  }
}

export default async function CoursePage({ params }:CoursePageProps) {
  const course = await getCourse(params.courseId[0])

  if (!course) {
    notFound()
  }

  return (
    <main className="flex flex-1">
      {params.courseId[1] ? (
        <Video 
          lessonSlug={params.courseId[1]}
        />
      ): <div className="flex-1" />}
      <LessonsSidebar 
        course={course}
      />
    </main>
  )
}