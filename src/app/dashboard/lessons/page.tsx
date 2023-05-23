import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { DataTable } from "./components/data-table";
import { columns } from '@/app/dashboard/lessons/components/columns'
import { CreateLesson } from "@/components/create-lesson";

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
      duration: true,
    },
    orderBy: {
      name: 'asc',
    }
  })
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Lessons"
        text='Create and manage lessons.'
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateLesson /> : ''
        }
      </DashboardHeader>
        <DataTable data={lessons} columns={columns}/>
      </DashboardShell>
  )
}