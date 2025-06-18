"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gray-50">{children}</main>
      </div>
    </SessionProvider>
  );
}
