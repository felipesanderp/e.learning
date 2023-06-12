import { redirect } from "next/navigation";
import { User } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { authOptions } from "@/lib/auth";

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
      role: true,
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

  return (
    <h1>{params.userId}</h1>
  )
}