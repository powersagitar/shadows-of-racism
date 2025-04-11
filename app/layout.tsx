import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { inter, roboto } from "./fonts";
// import LoginStatus from "@/components/login-status";

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
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <header>
          <NavBar />
          {/* <LoginStatus /> */}
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="mt-10">
          <Footer />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
