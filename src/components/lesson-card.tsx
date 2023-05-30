'use client'

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface LessonCard {
  name: string
  slug: string
  courseId: string
}

export function LessonCard({ name, slug, courseId }: LessonCard) {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleClick = (courseId: string, slug: string) => {
    router.push(`/dashboard/courses/${courseId}/${slug}`)
  }

  return (
    <div>
      <button className="group" onClick={() => handleClick(courseId, slug)}>
        <div className={cn(
          "w-[18rem] rounded border border-gray-500 p-4 mt-2 group-hover:border-purple-500",
          pathname === (`/dashboard/courses/${courseId}/${slug}`) ? 'bg-purple-100 border-purple-500 dark:bg-purple-900' : 'border-gray-500'
        )}>
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <CheckCircle />
              Conteúdo liberado
            </span>
          </header>

          <strong className="mt-5 block">
            {name}
          </strong>
        </div>
      </button>
    </div>
  )
}