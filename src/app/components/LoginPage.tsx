"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSignIn = (role: "admin" | "user") => {
    signIn("auth0", { callbackUrl: "/dashboard" }, { role });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className="text-4xl mb-4">🔐</div>

        <h1 className="text-xl font-semibold text-gray-900 mb-1">Hoş Geldin</h1>
        <p className="text-sm text-gray-500 mb-8">
          Devam etmek için giriş türünü seç.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSignIn("user")}
            className="w-full py-2 px-4 border-2 border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 transition font-medium cursor-pointer"
          >
            Kullanıcı Girişi
          </button>

          <button
            onClick={() => handleSignIn("admin")}
            className="w-full py-2 px-4 border-2 border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 transition font-medium cursor-pointer"
          >
            Admin Girişi
          </button>
        </div>

        <p className="text-m text-gray-400 mt-8">© 2025 Emirhan Bodur</p>
      </div>
    </main>
  );
}
