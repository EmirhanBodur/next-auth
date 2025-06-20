import Auth0Provider from "next-auth/providers/auth0";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // kullanıcı login değilse buraya yönlenir
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, idToken }) {
      console.log("🔥 jwt callback çalıştı");

      // Kullanıcı giriş yapıyorsa ve ID Token geldiyse
      if (account && idToken) {
        console.log("🟡 Gelen ID Token:", idToken);

        const roleFromToken =
          idToken["https://dev-i7a43o5ks6izwvjh.us.auth0.com/role"];

        console.log("🔵 Gelen ROLE:", roleFromToken);

        token.role = roleFromToken || "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
