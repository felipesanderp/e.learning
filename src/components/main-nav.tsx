"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface MainNavProps {
  user: Pick<User, "id" | "role">
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x4 lg:space-x-6")}
    >
      <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
        <Icons.graduationCap className="stroke-purple-500" />
          <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <Link
        href="/dashboard"
        className={cn(
          "text-md transition-colors hover:text-primary",
          pathname === '/dashboard' ? "font-bold text-primary border-b-2 border-purple-500 max-w-fit" : "text-foreground/60"
        )}
      >
        Home
      </Link>

      {user.role === 'ADMIN' || user.role === 'PROFESSOR' ? (
        <Link
          href="/dashboard/courses"
          className={cn(
            "text-md transition-colors hover:text-primary",
            pathname?.startsWith("/dashboard/courses") ? "font-bold text-primary border-b-2 border-purple-500 max-w-fit" : "text-foreground/60"
          )}
        >
          Cursos
        </Link>
      ): ''}

      {user.role === 'ADMIN' || user.role === 'PROFESSOR' ?
        <Link
          href="/dashboard/lessons"
          className={cn(
            "text-md transition-colors hover:text-primary",
            pathname?.startsWith("/dashboard/lessons") ? "font-bold text-primary border-b-2 border-purple-500 max-w-fit" : "text-foreground/60"
          )}
        >
          Aulas
        </Link> : ''}

      {user.role === 'ADMIN' || user.role === 'PROFESSOR' ? 
        <Link
          href="/dashboard/users"
          className={cn(
            "text-md transition-colors hover:text-primary",
            pathname?.startsWith("/dashboard/users") ? "font-bold text-primary border-b-2 border-purple-500 max-w-fit" : "text-foreground/60"
          )}
        >
          Usuários
        </Link> : ''}

      <Link
        href="/dashboard/profile"
        className={cn(
          "text-md transition-colors hover:text-primary",
          pathname?.startsWith("/dashboard/profile") ? "font-bold text-primary border-b-2 border-purple-500 max-w-fit" : "text-foreground/60"
        )}
      >
        Meu Perfil
      </Link>
    </nav>
  )
}