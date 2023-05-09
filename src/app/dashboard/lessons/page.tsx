import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default async function LessonsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
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