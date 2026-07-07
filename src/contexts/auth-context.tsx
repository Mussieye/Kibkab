"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, LoginCredentials, RegisterData, AuthResponse } from "@/lib/auth-config";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
          
          // Verify token is still valid
          await refreshToken();
        } catch (error) {
          console.error('Invalid stored auth data:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const authData: AuthResponse = await response.json();
      
      setUser(authData.user);
      setToken(authData.token);
      
      // Store in localStorage
      localStorage.setItem('auth_token', authData.token);
      localStorage.setItem('auth_refresh_token', authData.refreshToken);
      localStorage.setItem('auth_user', JSON.stringify(authData.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const authData: AuthResponse = await response.json();
      
      setUser(authData.user);
      setToken(authData.token);
      
      // Store in localStorage
      localStorage.setItem('auth_token', authData.token);
      localStorage.setItem('auth_refresh_token', authData.refreshToken);
      localStorage.setItem('auth_user', JSON.stringify(authData.user));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_user');
    
    // Call logout API to invalidate token
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user || !token) return;

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Profile update failed');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('auth_refresh_token');
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const authData: AuthResponse = await response.json();
      setToken(authData.token);
      localStorage.setItem('auth_token', authData.token);
      localStorage.setItem('auth_refresh_token', authData.refreshToken);
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: User['role']
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Access Denied</h1>
            <p className="text-charcoal/80 mb-6">Please log in to access this page.</p>
            <a href="/auth/login" className="px-6 py-3 bg-gold text-royal-purple rounded-lg hover:bg-gold/90 transition-colors font-medium">
              Log In
            </a>
          </div>
        </div>
      );
    }

    if (requiredRole && user?.role !== requiredRole) {
      return (
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Access Denied</h1>
            <p className="text-charcoal/80 mb-6">You don't have permission to access this page.</p>
            <a href="/" className="px-6 py-3 bg-gold text-royal-purple rounded-lg hover:bg-gold/90 transition-colors font-medium">
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
