import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LoginStatus from "@/components/login-status";

export const metadata: Metadata = {
  title: "Shadows of Racism",
  description: "Shadows of Racism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LoginStatus />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
