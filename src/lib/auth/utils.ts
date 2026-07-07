import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { User, JWTPayload, AuthSession } from "./types";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // 7 days

export class AuthUtils {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: User): string {
    if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set');
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
    };
    return jwt.sign(payload, JWT_SECRET);
  }

  // Verify JWT token
  static verifyToken(token: string): JWTPayload | null {
    if (!JWT_SECRET) return null;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  // Create auth session
  static createSession(user: User): AuthSession {
    const token = this.generateToken(user);
    const expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString();

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        membershipDate: user.membershipDate,
        profileImage: user.profileImage,
      },
      token,
      expiresAt,
    };
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: "Password must contain at least one number" };
    }
    return { isValid: true };
  }

  // Generate user ID
  static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if user has required role
  static hasRole(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      admin: 3,
      editor: 2,
      member: 1,
    };

    return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
           roleHierarchy[requiredRole as keyof typeof roleHierarchy];
  }

  // Sanitize user data for client
  static sanitizeUser(user: User): Omit<User, "createdAt" | "lastLogin"> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      address: user.address,
      membershipDate: user.membershipDate,
      profileImage: user.profileImage,
    };
  }
}
