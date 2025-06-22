// src/app/api/users/route.ts

import { getUsersFromAuth0 } from "@/app/lib/getUsers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getUsersFromAuth0();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { error: "Kullanıcılar getirilemedi" },
      { status: 500 }
    );
  }
}
