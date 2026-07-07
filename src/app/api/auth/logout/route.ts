import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the auth cookie
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    console.log("User logged out successfully");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
