import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { dbUsers } from '../../../database'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Custom login',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Correo',
          type: 'email',
          placeholder: 'jondoe@gmail.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        return await dbUsers.checkUserEmailPassword(
          credentials!.username,
          credentials!.password
        ) 

        // TODO: validar contra la base de datos

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],

  callbacks: {
    //

    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'credentials':
            token.user = user
            break
          case 'oauth':
            // TODO: crear o verificar si existe en mongo
            break

          default:
            break
        }
      }

      return token
    },

    async session({ session, user, token }) {
      console.log({ session, user, token })

      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    }

    // More options for callbacks!
    //
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return false
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
  }
})
