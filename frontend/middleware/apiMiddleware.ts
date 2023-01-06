import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest, currentUser: any) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const logged_in = request.cookies.get("logged_in")?.value || "";
}
