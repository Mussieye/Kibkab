import { NextRequest, NextResponse } from "next/server";
import { userStorage } from "@/lib/auth/storage";
import { AuthUtils } from "@/lib/auth/utils";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    const rateLimit = checkRateLimit(`register:${ip}`);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const body = await request.json();
    const { name, email, password, phone, address } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const validation = AuthUtils.validatePassword(password);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    let user;
    try {
      user = await userStorage.createUser({
        name,
        email,
        password,
        role: "member",
        phone: phone || "",
        address: address || "",
        membershipDate: new Date().toISOString(),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("already exists")) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
      }
      throw err;
    }

    const token = AuthUtils.generateToken(user);

    const response = NextResponse.json({ user, token }, { status: 201 });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
