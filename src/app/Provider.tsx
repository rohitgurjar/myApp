"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import Session from next-auth
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session?: Session | null; // Optional session prop with the correct type
}

function Provider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
