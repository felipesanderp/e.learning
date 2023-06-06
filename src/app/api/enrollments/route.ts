import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const createEnrollmentSchema = z.object({
  userId: z.string(),
  courseId: z.string()
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = createEnrollmentSchema.parse(json)

    const enrollment = await db.enrollment.create({
      data: {
       courseId: body.courseId,
       userId: body.userId,   
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return new Response(JSON.stringify(enrollment))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}