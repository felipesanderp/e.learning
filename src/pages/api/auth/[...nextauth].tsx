import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"

import { authOptions } from "@/lib/auth"

// @see ./lib/auth
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions(req, res))
}
