"use client";

import {
  SessionProvider as SessionBaseProvider,
  useSession,
} from "next-auth/react";
import React from "react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  return (
    <SessionBaseProvider session={session}>{children}</SessionBaseProvider>
  );
};

export default SessionProvider;
