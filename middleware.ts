import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  // see https://github.com/powersagitar/shadows-of-racism/pull/1#pullrequestreview-2727370058
  if (
    !session &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    const newUrl = new URL("/account", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
