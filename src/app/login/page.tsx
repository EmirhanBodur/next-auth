"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Giriş Yap / Kayıt Ol
        </h1>

        <button
          onClick={() => signIn("auth0")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Giriş Yap
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Hesabınız yok mu?{" "}
          <button
            onClick={() =>
              signIn("auth0", {
                screen_hint: "signup",
              })
            }
            className="text-blue-600 hover:underline"
          >
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
}
