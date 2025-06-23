// src/app/api/users/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"; // ✅ dosya adıyla tam uyumlu
// ✅ Doğru yol burası
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
  }

  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    headers: {
      Authorization: `Bearer ${await getManagementToken()}`,
    },
  });
  const users = await res.json();
  return NextResponse.json(users);
}

async function getManagementToken(): Promise<string> {
  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_MGMT_CLIENT_ID,
      client_secret: process.env.AUTH0_MGMT_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });
  const data = await res.json();
  return data.access_token;
}
