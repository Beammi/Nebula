// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from "../../../lib/auth" // Function to verify password
import { connectToDatabase } from "../../../lib/db" // Function to connect to database
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase()

        const { rows } = await client.query(
          "SELECT * FROM users WHERE email = $1",
          [credentials.email]
        )

        if (!rows[0]) {
          client.release()
          throw new Error("No user found with the email")
        }

        const isValid = await verifyPassword(
          credentials.password,
          rows[0].password
        )

        if (!isValid) {
          client.release()
          throw new Error("Could not log you in!")
        }

        client.release()
        return { email: rows[0].email }
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),
    // ... other providers
  ],
  // ... other NextAuth configurations
  session: {
    jwt: true,
  },

  callbacks: {
    async jwt({ token, account, profile }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        return token
      },
    async session({ session, token, user }) {
      // Add custom logic here if needed
      console.log("Session:", session);
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
  },
})
