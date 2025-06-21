import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import jwt_decode from "jwt-decode"; // ✅ sadece bu

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      // 👇 BU KISMI KALDIR
      // profile(profile) {
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //     role: profile["..."] ?? "user"
      //   };
      // },
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
      console.log("🧪 JWT CALLBACK");

      if (account?.id_token) {
        console.log("📦 RAW ID TOKEN:", account.id_token);

        const decoded: any = jwt_decode(account.id_token);
        console.log("📬 DECODED PAYLOAD:", decoded);

        const role = decoded["https://myapp.com/roles"];

        console.log("🎯 ROLE:", role);

        token.role = role || "user";
      } else {
        console.log("❌ ID Token yok");
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
  },
});

export { handler as GET, handler as POST };
