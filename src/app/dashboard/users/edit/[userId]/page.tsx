import { redirect, notFound } from "next/navigation";
import { User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { authOptions } from "@/lib/auth";

import { EditUseForm } from "@/components/edit-user-form";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";

async function getUser(userId: User['id']) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
      bio: true,
      role: true,
      enrollments: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
            }
          }
        },
        where: {
          canceledAt: null
        }
      }
    }
  })
}

interface EditUserPageProps {
  params: { userId: string }
}

export default async function EditUserPage({ params }:EditUserPageProps) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN' && currentUser.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }

  const user = await getUser(params.userId)

  if(!user) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Gerencie esse usuário"
        text="Edite esse usuário apenas."
      />
      <EditUseForm 
        user={{
          id: user.id,
          name: user.name,
          email: user.email || '',
          role: user.role,
          bio: user.bio || '',
          enrollments: user.enrollments
        }}
      />
    </DashboardShell>
  )
}