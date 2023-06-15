import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserInfoForm } from "@/components/user-info-form";
import Uploader from "@/components/uploader";

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
        heading="Meu Perfil"
        text="Gerencie sua conta."
      />
      <div>
        <UserInfoForm 
          user={
            { id: user.id, 
              name: user.name || "", 
              email: user.email || "", 
              image: user.image || "", 
              imageKey: user.imageKey || "",
              bio: user.bio || "",
            }
          } 
        />
      </div>
    </DashboardShell>
  )
}