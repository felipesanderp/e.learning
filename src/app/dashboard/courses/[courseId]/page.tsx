import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Courses } from "@prisma/client"
import { Video } from "@/components/video"

async function getCourse(courseId: Courses["id"]) {
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
    <Video />
  )
}