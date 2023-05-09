import * as z from "zod"

export const userPatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).max(250).optional(),
  image: z.string().optional(),
  password: z.string().min(3).max(250).optional(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT']).optional(),
})