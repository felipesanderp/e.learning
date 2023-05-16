import { LessonCard } from "./lesson-card";

export function LessonsSidebar() {
  return (
    <aside className="w-[348px] bg-background p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        <LessonCard />
      </div>
    </aside>
  )
}