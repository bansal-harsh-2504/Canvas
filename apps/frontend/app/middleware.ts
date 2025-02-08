import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = ["/room", "/rooms"].includes(path);

  const token = request.cookies.get("token")?.value || "";

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isProtectedRoute && token) {
    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/room",
    "/rooms",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
