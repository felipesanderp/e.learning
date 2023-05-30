import { LessonCard } from "./lesson-card";

interface Course {
  id: string
  title: string
  lessons: {
    id: string
    name: string,
    slug: string,
    description: string
    video_id: string
  }[]
}

interface LessonsSidebarProps {
  course: Course
}

export function LessonsSidebar({ course }: LessonsSidebarProps) {
  return (
    <aside className="w-[348px] min-h-screen bg-background p-6 border-l border-zinc-400">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-zinc-400 block">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {course.lessons.map((lesson) => (
          <LessonCard 
            key={lesson.id} 
            name={lesson.name} 
            slug={lesson.slug} 
            courseId={course.id}
          />
        ))}
      </div>
    </aside>
  )
}