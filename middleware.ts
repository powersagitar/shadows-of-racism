import { auth } from "@/auth";
import { NextRequest } from "next/server";

const protectedRoutes = ["/artist", "/teacher"];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/account", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
