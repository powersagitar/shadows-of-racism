import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { inter, roboto } from "./fonts";

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
      <body className="antialiased min-h-screen flex flex-col">
        <header>
          <NavBar />
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="mt-10">
          <Footer />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
