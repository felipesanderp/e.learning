import * as z from "zod"

export const mePatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).max(250).optional(),
  image: z.string().optional(),
  imageKey: z.string().optional()
})

export const userPatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).max(250).optional(),
  image: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT']).optional(),
})

export const createUserSchema = z.object({
  name: z.string().min(3).max(250),
  email: z.string().email().optional(),
  password: z.string().min(8).max(50).optional(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT']).optional(),
})