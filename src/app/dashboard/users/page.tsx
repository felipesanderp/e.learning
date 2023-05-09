import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: 'Users | e.learning',
}

export default async function Users() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading='Users'
        text='Create and manage users.'
      />
    </DashboardShell>
  )
}