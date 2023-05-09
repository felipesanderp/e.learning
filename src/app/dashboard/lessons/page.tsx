import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export const metadata = {
  title: 'Lessons | e.learning',
}

export default async function LessonsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Lessons"
        text='Create and manage lessons.'
      >
        {/* {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateCourse /> : ''
        } */}
      </DashboardHeader>
      </DashboardShell>
  )
}