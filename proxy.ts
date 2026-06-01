/**
 * Route protection: chat pages and the chat API require a valid session.
 *
 * If unauthenticated:
 *  - HTML routes redirect to /signin?callbackUrl=<original-path>
 *  - API routes return 401 JSON
 */
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isAuthed = !!req.auth?.user;
  if (isAuthed) return;

  const url = req.nextUrl;
  const isApi = url.pathname.startsWith("/api/");

  if (isApi) {
    return NextResponse.json(
      { error: "Sign in required" },
      { status: 401 }
    );
  }

  const signin = new URL("/signin", url);
  signin.searchParams.set("callbackUrl", url.pathname + url.search);
  return NextResponse.redirect(signin);
});

export const config = {
  matcher: [
    // Protect every /analytics/<domain>/chat page (any depth)
    "/analytics/:domain/chat/:path*",
    "/analytics/:domain/chat",
    // Protect the chat API (where Anthropic + BigQuery costs are incurred)
    "/api/:domain/chat/:path*",
    "/api/:domain/chat",
  ],
};
