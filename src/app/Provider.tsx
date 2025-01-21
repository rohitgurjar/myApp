"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session?: any; // Optional session prop
}

function Provider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
