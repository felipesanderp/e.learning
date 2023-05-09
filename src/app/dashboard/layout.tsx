import * as React from "react"
import { notFound } from "next/navigation"

import { UserAccountNav } from "@/components/user-account-nav"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { getCurrentUser } from "@/lib/session"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div>
      <div className="border-b border-zinc-400">
        <div className="flex h-16 items-center px-4">
          <MainNav 
            user={{
              id: user.id,
              role: user.role,
            }}
          />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserAccountNav 
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}