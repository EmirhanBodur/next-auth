"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-8 text-gray-600">Yükleniyor...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Hoş geldin Dashboard'a
      </h1>

      {session?.user && (
        <div className="text-lg text-gray-700">
          <p>
            Giriş yapan:{" "}
            <strong>{session.user.name || session.user.email}</strong>
          </p>
          <p>
            Rol:{" "}
            <span className="font-semibold text-blue-600">
              {session.user.role}
            </span>
          </p>
        </div>
      )}
    </main>
  );
}
