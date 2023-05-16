import { Circle } from "lucide-react";
import Link from "next/link";

export function LessonCard() {
  return (
    <div>
      <Link href='#' className="group">
        <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Circle />
              Conteúdo liberado
            </span>
          </header>

          <strong className="mt-5 block">
            Titulo da Aula
          </strong>
        </div>
      </Link>
    </div>
  )
}