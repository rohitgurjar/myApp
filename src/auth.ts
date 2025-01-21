import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { authenticatess } from "./app/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session({ session, token }) {
      if (token && token.jwtToken) {
        try {
          const decodedToken = jwt.decode(token.jwtToken);

          session.user = {
            name: token.name,
            userId: token.id,
            jwtToken: token.jwtToken,
            info: decodedToken,
          };
        } catch (error) {
          console.error("Error decoding JWT:", error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && account.provider === "google") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      } else if (account && account.provider === "apple") {
        // Handle Apple provider
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image; // Assuming `image` is available in the Apple provider's response
      } else if (user) {
        token.id = user.id;
        token.name = user.firstName;
        token.jwtToken = user.jWT;
      }
      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    GoogleProvider({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    }),
    AppleProvider({
      clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_APPLE_CLIENT_SECRET, // Ensure this is set in your environment
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await authenticatess({
          email: credentials.email,
          password: credentials.password,
        });

        user = await res?.data;
        if (res?.data && user) {
          return user;
        }
        if (!res.data) {
          throw new Error(res.message);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
