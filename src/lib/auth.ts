import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { ROLE, User } from '@prisma/client'
import { compare } from 'bcrypt'

import { db } from "@/lib/db"

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
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, _) => {
        if (!credentials?.email || !credentials.password) return null;

        const user: User | null = await db.user.findFirst({
          where: {
            email: {
              equals: credentials?.email,
              mode: "insensitive",
            }
          }
        });

        if (user) {
          const passwordMatch = await compare(credentials.password, user.password);

          if(!passwordMatch) {
            return null
          }

          return user;
        }

        return null
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
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }

      return token
    }
  }
}