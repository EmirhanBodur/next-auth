// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Giriş yapılmamışsa ana sayfaya yönlendir
  },
  callbacks: {
    authorized: ({ token }) => {
      return !!token; // Token varsa yetkilidir
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Sadece /dashboard ve alt yollar koruma altında
};
