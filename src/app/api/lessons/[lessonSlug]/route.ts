import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import slugify from 'slugify'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { lessonPatchSchema } from '@/lib/validations/lesson'

const routeContextSchema = z.object({
  params: z.object({
    lessonSlug: z.string(),
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

    const lesson = await db.lessons.findUnique({
      where: {
        slug: params.lessonSlug as string,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        video_id: true,
        user: {
          select: {
            name: true,
            image: true,
            bio: true,
          }
        }
      }
    })

    return new Response(JSON.stringify(lesson))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
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
    
    await db.lessons.delete({
      where: {
        slug: params.lessonSlug,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

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

    const json = await req.json()
    const body = lessonPatchSchema.parse(json)

    await db.lessons.update({
      where: {
        slug: params.lessonSlug,
      },
      data: {
        name: body.name,
        slug: slugify(body.name!!, { lower: true }),
        description: body.description,
        video_id: body.video_id,
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