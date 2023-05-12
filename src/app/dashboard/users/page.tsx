import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db"

import { columns } from '@/app/dashboard/users/components/columns'
import { DataTable } from '@/app/dashboard/users/components/data-table'
import { CreateUser } from "@/components/create-user";

export const metadata = {
  title: 'Users | e.learning',
}

export default async function Users() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    }
  })
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading='Users'
        text='Create and manage users.'
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateUser /> : ''
        }
      </DashboardHeader>
      <DataTable data={users} columns={columns} />
    </DashboardShell>
  )
}