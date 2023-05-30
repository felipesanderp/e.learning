import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import slugify from 'slugify'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const routeContextSchema = z.object({
  params: z.object({
    lessonId: z.string(),
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

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const lesson = await db.lessons.findFirst({
      where: {
        id: params.lessonId as string,
      },
      select: {
        id: true,
        name: true,
        description: true,
        video_id: true,
        slug: true,
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
        id: params.lessonId as string,
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

// export async function PATCH(
//   req: Request,
//   context: z.infer<typeof routeContextSchema>
// ) {
//   try {
//     const { params } = routeContextSchema.parse(context)

//     const session = await getServerSession(authOptions)

//     if (!session) {
//       return new Response("Unauthorized", { status: 403 })
//     }

//     const { user } = session

//     if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
//       return new Response("Unauthorized", { status: 403 })
//     }

//     const json = await req.json()
//     const body = coursePatchSchema.parse(json)

//     await db.courses.update({
//       where: {
//         id: params.courseId,
//       },
//       data: {
//         title: body.title,
//         slug: slugify(body.title!!),
//         description: body.description,
//         imageURL: body.imageURL,
//       }
//     })

//     return new Response(null, { status: 200 })
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 })
//     }

//     return new Response(null, { status: 500 })
//   }
// }