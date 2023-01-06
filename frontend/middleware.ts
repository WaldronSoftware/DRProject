import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";
// import Cookies from "js-cookie";

// import { verifyJwt } from "./jwt";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  // const { cookies } = request;
  //@ts-ignore
  // const token = request.cookies;
  const token = request.cookies.get("accessToken")?.value;
  // console.log(token);
  // console.log(token1);

  if (request.url.includes("/register") && token) {
    // if (
    //   // verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_PRIVATE_KEY as string)
    //   token
    // ) {
    // return NextResponse.redirect(new URL("/profile", request.url));
    // }
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.url.includes("/login") && token) {
    // if (
    //   // verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_PRIVATE_KEY as string)
    //   token
    // ) {
    // return NextResponse.redirect(new URL("/profile", request.url));
    // }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.url.includes("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (protectedRoutes.includes(request.url.pathname) && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}
