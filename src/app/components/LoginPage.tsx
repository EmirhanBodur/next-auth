"use client";

import { signIn } from "next-auth/react";
import { FaLock } from "react-icons/fa";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
            <FaLock />
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Giriş Yap
          </h1>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Uygulamaya erişmek için giriş yap.
          </p>

          <button
            onClick={() => signIn("auth0", { callbackUrl: "/dashboard" })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition cursor-pointer"
          >
            Auth0 ile Giriş Yap
          </button>

          <p className="text-xs text-gray-400 mt-8 text-center">
            Hazırlayan:{" "}
            <span className="font-medium text-gray-500">Emirhan Bodur</span>
          </p>
        </div>
      </section>
    </main>
  );
}
