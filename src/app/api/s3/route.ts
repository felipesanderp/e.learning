import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'

const s3Client = new S3Client({
  region: process.env.NEXT_S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: 'AKIA5MAC3ACCPEPXA3FU',
    secretAccessKey: '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',
  }
})

const uploadSchema = z.object({
  name: z.string(),
  type: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req
    const body = uploadSchema.parse(json)

    const fileParams = {
      Body: body.name,
      Bucket: process.env.NEXT_S3_UPLOAD_BUCKET,
      Key: body.name,
    }

    const command = new PutObjectCommand(fileParams)
    const response = await s3Client.send(command)

    return new Response(JSON.stringify(response))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
} 