import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    jwt: true,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const response = await prisma.user.findFirst({
          where: {
            name: credentials.email,
          },
        });

        console.log(response);

        const confirm =
          response.password === credentials.password ? true : false;

        console.log(credentials);

        if (confirm) {
          console.log("OK");
          return {
            id: response.id,
            email: response.name,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
