"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSignIn = (role: "admin" | "user") => {
    signIn("auth0", { callbackUrl: "/dashboard" }, { role });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Giriş Türü Seç</h2>

        <button
          onClick={() => handleSignIn("admin")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Admin Giriş
        </button>

        <button
          onClick={() => handleSignIn("user")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
        >
          User Giriş
        </button>

        <p className="text-sm text-gray-400 mt-6">© 2025 Emirhan Bodur</p>
      </div>
    </main>
  );
}
