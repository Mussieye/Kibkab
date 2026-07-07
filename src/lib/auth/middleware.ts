import { NextRequest, NextResponse } from "next/server";
import { AuthUtils } from "./utils";
import { userStorage } from "./storage";
import type { User, UserRole } from "./types";

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export async function authenticate(request: NextRequest): Promise<{ user: User } | null> {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return null;

    const payload = AuthUtils.verifyToken(token);
    if (!payload) return null;

    const user = await userStorage.getUserById(payload.userId);
    if (!user) return null;

    return { user };
  } catch {
    return null;
  }
}

export function authorize(user: User, requiredRole: UserRole): boolean {
  return AuthUtils.hasRole(user.role, requiredRole);
}

export function withAuth(
  handler: (req: NextRequest, context: { user: User }) => Promise<NextResponse>,
  requiredRole?: UserRole
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const auth = await authenticate(request);
    if (!auth) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    if (requiredRole && !authorize(auth.user, requiredRole)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }
    return handler(request, { user: auth.user });
  };
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  const auth = await authenticate(request);
  return auth?.user || null;
}
