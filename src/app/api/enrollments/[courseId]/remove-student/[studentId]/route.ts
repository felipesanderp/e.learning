import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const routeContextSchema = z.object({
  params: z.object({
    courseId: z.string(),
    studentId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    await db.enrollment.updateMany({
      where: {
        courseId: params.courseId,
        AND: {
          userId: params.studentId,
        }
      },
      data: {
        canceledAt: new Date(),
      }
    })
    
    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}