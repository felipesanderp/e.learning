import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.number(),
})

export type User = z.infer<typeof userSchema>