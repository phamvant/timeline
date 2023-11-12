import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import myFileRouter from "./api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(myFileRouter)} />
        {/* <nav>
          {!!session && <Logout />}
          {!session && <Link href="/login">Login</Link>}
        </nav> */}
        {children}
      </body>
    </html>
  );
}
