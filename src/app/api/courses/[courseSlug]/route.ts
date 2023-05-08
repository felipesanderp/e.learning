import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const routeContextSchema = z.object({
  params: z.object({
    courseSlug: z.string(),
  })
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

    const course = await db.courses.findFirst({
      where: {
        slug: params.courseSlug as string,
      },
    })

    return new Response(JSON.stringify(course))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}