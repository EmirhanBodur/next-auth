"use client";

import { SessionProvider } from "next-auth/react";
import Page from "./page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Page>{children}</Page>
    </SessionProvider>
  );
}
