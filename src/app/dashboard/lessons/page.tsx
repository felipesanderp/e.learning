import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./components/data-table";
import { columns } from '@/app/dashboard/lessons/components/columns'
import { CreateLessonForm } from "@/components/create-lesson-form";

export const metadata = {
  title: 'Lessons | e.learning',
}

export default async function LessonsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }

  const lessons = await db.lessons.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
    orderBy: {
      name: 'asc',
    }
  })

  const professors = await db.user.findMany({
    where: {
      role: 'PROFESSOR',
    },
    select: {
      id: true,
      name: true,
    }
  })
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Aulas"
        text='Crie e gerencie aulas.'
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateLessonForm 
            professors={professors}
          /> : ''
        }
      </DashboardHeader>
        <DataTable data={lessons} columns={columns}/>
      </DashboardShell>
  )
}