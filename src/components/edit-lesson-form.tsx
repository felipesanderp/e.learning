import { Lessons } from "@prisma/client"

interface EditLessonForm {
  lesson: Pick<Lessons, "id" | "name" | "slug" | "description" | "video_id">
}

export function EditLessonForm({ lesson }: EditLessonForm) {
  return (
    <h1>Lesson edit form {lesson.name}</h1>
  )
}