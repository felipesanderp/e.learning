import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import { hash } from 'bcrypt'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { mePatchSchema } from '@/lib/validations/user'

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

    const me = await db.user.findFirst({
      where: {
        id: session?.user.id,
      },
    })

    return new Response(JSON.stringify(me))
  } catch (error) {
    
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

    if (!session?.user || params.meId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const body = await req.json()
    const payload = mePatchSchema.parse(body)

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        email: payload.email,
        name: payload.name,
        image: payload.image,
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