import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullish().catch( undefined ),
  image: z.string().nullish().catch( undefined ),
  role: z.enum(["ADMIN", "PROFESSOR", "STUDENT"]),
  isActive: z.string(),
})

export type User = z.infer<typeof userSchema>