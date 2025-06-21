"use client";

import { useSession } from "next-auth/react";

export default function UsersPage() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  if (role === "admin") {
    return (
      <div>
        <h1 className="text-xl font-bold">Ooo admin baba hoşgelmişen 😎</h1>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg text-red-600">
        Bu içeriği görmeye yetkiniz yoktur.
      </p>
    </div>
  );
}
