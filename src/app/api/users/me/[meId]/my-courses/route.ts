import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const routeContextSchema = z.object({
  params: z.object({
    meId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!session?.user || params.meId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const myCourses = await db.user.findMany({
      where: {
        id: session.user.id,
      },
      include: {
        enrollments: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
                imageURL: true,
                description: true,
                slug: true,
                createdAt: true,
              }
            }
          }
        }
      }
    })

    return new Response(JSON.stringify(myCourses))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
