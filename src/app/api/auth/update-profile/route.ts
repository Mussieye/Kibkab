import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth/middleware";
import { userStorage } from "@/lib/auth/storage";

export async function PUT(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, phone, address } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Update user in storage
    const updatedUser = await userStorage.updateUser(auth.user.id, {
      name: name.trim(),
      phone: phone?.trim() || "",
      address: address?.trim() || "",
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("Profile updated:", { id: updatedUser.id, name: updatedUser.name });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
