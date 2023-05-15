import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { ROLE, User } from '@prisma/client'

import { compare } from 'bcrypt'
import { db } from "@/lib/db"
import { userAuthSchema } from "./validations/auth"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: ROLE;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: ROLE;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: ROLE;
  }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 1 // 1 hour,
    },
    pages: {
      signIn: '/'
    },
    providers: [
      CredentialsProvider({
        id: 'credentials',
        credentials: {
          email: {},
          password: {}
        },
        authorize: async (credentials, _) => {
          if (!credentials?.email || !credentials.password) return null;

          const { email, password } = await userAuthSchema.parseAsync(credentials);

          const user: User | null = await db.user.findFirst({
            where: {
              email: {
                equals: email,
              }
            }
          });
        
          if (!user) return null

          const passwordMatch = await compare(password, user.password);

          if (!passwordMatch) return null

          return user
        }
      })
    ],
    callbacks: {
      async session({ token, session }) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role

        return session

      },
      async jwt({ token, user}) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          }
        })

        if (!dbUser) {
          if (user) {
            token.id = user?.id
            token.role = user?.role
          }

          return token
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
          role: dbUser.role,
        }
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
}