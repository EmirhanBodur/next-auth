// src/app/lib/authOptions.ts
import Auth0Provider from "next-auth/providers/auth0";
import { NextAuthOptions } from "next-auth";
import jwt_decode from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      authorization: {
        params: {
          scope: "openid profile email",
          audience: "https://dev-i7a43o5ks6izwvjh.us.auth0.com/api/v2/",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const decoded: any = jwt_decode(account.id_token);
        token.role = decoded["https://myapp.com/roles"] || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role ?? "user";
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
};
