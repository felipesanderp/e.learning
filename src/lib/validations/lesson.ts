import * as z from "zod"

export const lessonCreateSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().min(3).max(250),
  video_id: z.string()
})