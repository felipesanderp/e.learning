import { notFound, redirect } from "next/navigation"
import { Lessons } from "@prisma/client"

import { EditLessonForm } from "@/components/edit-lesson-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

async function getLesson(lessonId: Lessons["id"]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return await db.lessons.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      video_id: true,
      description: true,
    }
  })
}

interface EditLessonPageProps {
  params: {
    lessonId: string
  }
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  const lesson = await getLesson(params.lessonId)

  if (!lesson) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Gerencie Aula"
        text="Edite, delete e adicione novos items à esse aula somente."
      />

      <EditLessonForm 
        lesson={lesson}
      />
    </DashboardShell>
  )
}