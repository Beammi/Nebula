import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth'; // Function to verify password
import { connectToDatabase } from '../../../lib/db'; // Function to connect to database

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const { rows } = await client.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials.email]
        );

        if (!rows[0]) {
          client.release();
          throw new Error('No user found with the email');
        }

        const isValid = await verifyPassword(credentials.password, rows[0].password);

        if (!isValid) {
          client.release();
          throw new Error('Could not log you in!');
        }

        client.release();
        return { email: rows[0].email };
      },
    }),
    // ... other providers
  ],
  // ... other NextAuth configurations
});
