import pool from "@app/mysql-database/database";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {

        if (!credentials) return null;

        const { username, password } = credentials;

        try {
          //copy and paste this to the form " or 1=1#
          const query = `SELECT * FROM Clients WHERE name = "${username}" AND email = '${password}'`;
          console.log('Vulnerable Query:', query);

          // Execute the vulnerable query
          const result = await pool.query(query);
          
          const users = result[0] as any;

          console.log("User Result", users)

          if(users.length === 0)
          {
            console.log("Authentication failed: No user found with the given username and password.");
            return null;
          }

          return {
            id: users.id,
            name: users.name,
            email: users.email,
          };
        } catch (error) {
          console.log('Unhandled error', error);
          return null;
        }

      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }