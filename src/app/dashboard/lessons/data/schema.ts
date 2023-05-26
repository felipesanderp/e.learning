import { z } from 'zod'

export const lessonSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type Lesson = z.infer<typeof lessonSchema>