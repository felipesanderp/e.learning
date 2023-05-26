import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { lessonCreateSchema } from "@/lib/validations/lesson"
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const lessons = await db.lessons.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        video_id: true,
      }
    })

    return new Response(JSON.stringify(lessons))
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
    const body = lessonCreateSchema.parse(json)

    const lesson = await db.lessons.create({
      data: {
        name: body.name,
        description: body.description,
        video_id: body.video_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        video_id: true,
      }
    })

    return new Response(JSON.stringify(lesson))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}