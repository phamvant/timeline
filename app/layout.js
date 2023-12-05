import { getServerSession } from "next-auth";
import "./globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import myFileRouter from "./api/uploadthing/core";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
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
