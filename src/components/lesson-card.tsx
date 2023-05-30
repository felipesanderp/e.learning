'use client'

import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";

interface LessonCard {
  name: string
  slug: string
  courseId: string
}

export function LessonCard({ name, slug, courseId }: LessonCard) {
  const router = useRouter()
  
  const handleClick = (courseId: string, slug: string) => {
    router.push(`/dashboard/courses/${courseId}/${slug}`)
  }

  return (
    <div>
      <button className="group" onClick={() => handleClick(courseId, slug)}>
        <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Circle />
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