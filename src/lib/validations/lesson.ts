import * as z from "zod"

export const lessonCreateSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().min(3).max(250),
  video_id: z.string(),
  user_id: z.string()
})

export const lessonPatchSchema = z.object({
  name: z.string().min(3).max(128).optional(),
  description: z.string().min(3).max(250).optional(),
  video_id: z.string().optional(),
})