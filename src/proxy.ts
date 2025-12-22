import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultRoute,
  getRouteOwner,
  isAuthRoute,
  UserRoles,
} from "./lib/auth-utlis";
import { deleteCookie, getCookie } from "./service/auth/tokenHandler";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRoles | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      (process.env.JWT_ACCESS_TOKEN_SECRET as string) || ""
    );

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultRoute(userRole as UserRoles), request.url)
    );
  }

  if (routeOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (routeOwner === "ADMIN" || routeOwner === "ORG_ADMIN") {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultRoute(userRole as UserRoles), request.url)
      );
    }
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
