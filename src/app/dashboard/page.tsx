import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: 'Dashboard | e.learning',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <h1>Dashboard</h1>
  )
}