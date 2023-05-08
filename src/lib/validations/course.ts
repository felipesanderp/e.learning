import * as z from "zod"

export const coursePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  description: z.string().min(3).max(250).optional(),
  imageURL: z.string().optional(),
})