import bcrypt from "bcryptjs";
import type { User } from "./types";

interface StoredUser extends User {
  hashedPassword?: string;
}

const DEMO_USERS = [
  { email: "admin@maranathachurch.org",  name: "Church Admin",   role: "admin"  as const, password: "Admin1234",  date: "2020-01-01T00:00:00.000Z" },
  { email: "editor@maranathachurch.org", name: "Content Editor", role: "editor" as const, password: "Editor1234", date: "2021-03-15T00:00:00.000Z" },
  { email: "member@maranathachurch.org", name: "Church Member",  role: "member" as const, password: "Member1234", date: "2022-06-20T00:00:00.000Z" },
];

class UserStorage {
  private users         = new Map<string, StoredUser>();
  private usersByEmail  = new Map<string, string>();
  private initialized   = false;

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    for (const d of DEMO_USERS) {
      const hashedPassword = await bcrypt.hash(d.password, 10);
      const u: StoredUser = {
        id: `demo_${d.role}`,
        email: d.email,
        name: d.name,
        role: d.role,
        hashedPassword,
        createdAt: d.date,
        membershipDate: d.date,
      };
      this.users.set(u.id, u);
      this.usersByEmail.set(u.email, u.id);
    }
  }

  private strip(u: StoredUser): User {
    const { hashedPassword: _, ...rest } = u;
    return rest;
  }

  async verifyUserPassword(email: string, password: string): Promise<User | null> {
    await this.ensureInitialized();
    const userId = this.usersByEmail.get(email);
    if (!userId) return null;
    const u = this.users.get(userId);
    if (!u?.hashedPassword) return null;
    const ok = await bcrypt.compare(password, u.hashedPassword);
    return ok ? this.strip(u) : null;
  }

  async createUser(
    userData: Omit<User, "id" | "createdAt"> & { password: string }
  ): Promise<User> {
    await this.ensureInitialized();
    if (this.usersByEmail.has(userData.email)) {
      throw new Error("User with this email already exists");
    }
    const { password, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    const u: StoredUser = {
      ...rest,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      hashedPassword,
      createdAt: new Date().toISOString(),
    };
    this.users.set(u.id, u);
    this.usersByEmail.set(u.email, u.id);
    return this.strip(u);
  }

  async getUserById(userId: string): Promise<User | null> {
    await this.ensureInitialized();
    const u = this.users.get(userId);
    return u ? this.strip(u) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    await this.ensureInitialized();
    const userId = this.usersByEmail.get(email);
    if (!userId) return null;
    const u = this.users.get(userId);
    return u ? this.strip(u) : null;
  }

  async updateUser(
    userId: string,
    updates: Partial<Omit<User, "id" | "createdAt">>
  ): Promise<User | null> {
    await this.ensureInitialized();
    const u = this.users.get(userId);
    if (!u) return null;
    if (updates.email && updates.email !== u.email) {
      if (this.usersByEmail.has(updates.email)) throw new Error("Email already in use");
      this.usersByEmail.delete(u.email);
      this.usersByEmail.set(updates.email, userId);
    }
    const updated = { ...u, ...updates };
    this.users.set(userId, updated);
    return this.strip(updated);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.ensureInitialized();
    const u = this.users.get(userId);
    if (u) u.lastLogin = new Date().toISOString();
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();
    return Array.from(this.users.values()).map(u => this.strip(u));
  }

  async getUserStats() {
    await this.ensureInitialized();
    const users = Array.from(this.users.values());
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return {
      total: users.length,
      byRole: users.reduce(
        (acc, u) => ({ ...acc, [u.role]: (acc[u.role] || 0) + 1 }),
        {} as Record<string, number>
      ),
      recentJoins: users.filter(u => new Date(u.createdAt) > cutoff).length,
    };
  }
}

export const userStorage = new UserStorage();
