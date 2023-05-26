import * as z from "zod"

export const courseCreateSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string().min(3).max(250),
  imageURL: z.string(),
  lessonId: z.string().optional(),
})

export const coursePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  description: z.string().min(3).max(250).optional(),
  imageURL: z.string().optional(),
})