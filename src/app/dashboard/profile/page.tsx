import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserInfoForm } from "@/components/user-info-form";

export const metadata = {
  title: 'Profile | e.learning',
}

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/")
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Profile"
        text="Manage your account."
      />
      <div>
        <UserInfoForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}