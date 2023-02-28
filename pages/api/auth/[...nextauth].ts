import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { dbUsers } from '../../../database'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'jon-doe@gmail.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        )
      }
    })
    // ...add more providers here
  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Session config
  session: {
    maxAge: 2592000, // cada mes
    strategy: 'jwt',
    updateAge: 86400 // cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
            // TODO: Crear usuario o verificar si ya esta en DB
            token.user = await dbUsers.createOAuthUser(
              user?.email || '',
              user?.name || '',
              account.provider,
              token?.picture || ''
            )
            break
          case 'credentials':
            token.user = user
            break
        }
      }

      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    }
  }
}

export default NextAuth(authOptions)
