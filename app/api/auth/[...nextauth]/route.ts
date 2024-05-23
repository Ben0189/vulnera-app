import { sql } from "@vercel/postgres";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const tempUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  username: "john",
  password: "password123" // In a real application, use hashed passwords
};

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
          let result;

          if (username.includes("'' OR 1=1 --")) {
            result = await sql`SELECT * FROM Clients WHERE Name = '' OR 1=1 -- AND Email = ''`;
            console.log("Warning your login is vulnerable to sql injection")
          } else {
            result = await sql`SELECT * FROM Clients WHERE name = ${username} AND email = ${password}`;
          }


          console.log("Query executed successfully. Data:", result.rows);

          // Check if any rows were returned
          if (result.rows.length === 0) {
            console.log("Authentication failed: No user found with the given username and password.");
            return null;
          }
          // Access the first client object from the result rows
          const client = result.rows[0];

          return {
            id: "Not Implemented",
            name: client.name,
            email: client.email
          };
        } catch (error) {
          console.log("Unhandled error", error);
          return null; // Proper error handling
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

