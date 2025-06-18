import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";
import type { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions satisfies NextAuthOptions);

export { handler as GET, handler as POST };
