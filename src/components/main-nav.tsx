"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

import { MainNavItem } from "@/types";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: MainNavItem[];
  children?: React.ReactNode;
  className?: string;
}

// export function MainNav({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLElement>) {
//   const pathname = usePathname();

//   return (
//     <nav
//       className={cn("flex items-center space-x-4 lg:space-x-6", className)}
//       {...props}
//     >
//       <Link
//         href="/dashboard"
//         className="text-sm font-medium transition-colors hover:text-primary"
//       >
//         Overview
//       </Link>
//       <Link
//         href="/dashboard/courses"
//         className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//       >
//         Courses
//       </Link>
//       <Link
//         href="/dashboard/lessons"
//         className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//       >
//         Lessons
//       </Link>
//       <Link
//         href="/dashboard/users"
//         className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//       >
//         Users
//       </Link>
//       <Link
//         href="/dashboard"
//         className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//       >
//         Settings
//       </Link>
//     </nav>
//   )
// }

export function MainNav({ items, className, children, ...props }:MainNavProps ) {
  const pathname = usePathname();

  return (
    <>
      {items?.length ? (
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                item.disabled && "cursor-not-allowed opacity-80",
                {
                  "font-bold text-primary": pathname === item.href
                }
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ): null}
    </>
  )
}