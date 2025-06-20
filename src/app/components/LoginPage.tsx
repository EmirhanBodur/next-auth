"use client";

import { signIn } from "next-auth/react";
import { FaLock } from "react-icons/fa";

console.log("✅ LoginPage YÜKLENDİ");

export default function LoginPage() {
  const handleSignIn = (role: "admin" | "user") => {
    console.log("🔥 Butona Basıldı:", role);

    signIn(
      "auth0",
      { callbackUrl: "/dashboard" }, // ① options
      { role } // ② authorizationParams: URL query param
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center">
          <FaLock className="text-white bg-blue-600 rounded-full p-3 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Giriş Yap</h1>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Giriş tipini seç:
          </p>

          <button
            onClick={() => handleSignIn("user")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-3"
          >
            User Giriş
          </button>

          <button
            onClick={() => handleSignIn("admin")}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            Admin Giriş
          </button>
        </div>
      </section>
    </main>
  );
}
