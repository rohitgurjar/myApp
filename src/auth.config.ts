import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const loginURL = ["/login", "/register", "/resend-activation-email"];

      const isOnSignInPage = loginURL.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      const protectedPaths = ["/my-reminder", "/profile"];

      const isOnProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isOnSignInPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/my-reminder", nextUrl));
        }
        return true;
      }

      if (isOnProtectedPath) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true; // Allow access to public paths (including root "/")
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
