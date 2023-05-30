import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import slugify from 'slugify'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const courseCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageURL: z.string(),
  lessonId: z.string().optional()
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const courses = await db.courses.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageURL: true,
        slug: true,
        lessons: {
          select: {
            id: true,
          }
        }
      }
    })

    return new Response(JSON.stringify(courses))

  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

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
    const body = courseCreateSchema.parse(json)

    if (body.lessonId !== undefined) {
      const course = await db.courses.create({
        data: {
          title: body.title,
          description: body.description,
          slug: slugify(body.title, { lower: true }),
          imageURL: body.imageURL,
          lessons: {
            connect: {
              id: body.lessonId
            }
          }
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageURL: true,
          slug: true,
        }
      })

      return new Response(JSON.stringify(course))
    } else {
      const course = await db.courses.create({
        data: {
          title: body.title,
          description: body.description,
          slug: slugify(body.title, { lower: true }),
          imageURL: body.imageURL,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageURL: true,
          slug: true,
        }
      })

      return new Response(JSON.stringify(course))
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}