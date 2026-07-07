export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'member';
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  membershipDate: Date;
  isActive: boolean;
  preferences: {
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

export interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  oauth: {
    google: {
      clientId: string;
      clientSecret: string;
    };
    facebook: {
      clientId: string;
      clientSecret: string;
    };
  };
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  session: {
    maxAge: number;
    secure: boolean;
    httpOnly: boolean;
    sameSite: 'strict' | 'lax' | 'none';
  };
}

export const defaultAuthConfig: AuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: '24h',
    refreshExpiresIn: '7d',
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || 'your-facebook-client-id',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'your-facebook-client-secret',
    },
  },
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RolePermissions {
  admin: string[];
  editor: string[];
  member: string[];
}

export const rolePermissions: RolePermissions = {
  admin: [
    'manage_users',
    'manage_content',
    'manage_donations',
    'manage_events',
    'manage_sermons',
    'view_analytics',
    'manage_settings',
    'access_admin_panel',
  ],
  editor: [
    'manage_content',
    'manage_events',
    'manage_sermons',
    'view_analytics',
  ],
  member: [
    'view_content',
    'view_events',
    'view_sermons',
    'manage_profile',
    'make_donations',
    'join_prayer_requests',
  ],
};

export function hasPermission(userRole: User['role'], permission: string): boolean {
  return rolePermissions[userRole]?.includes(permission) || false;
}

export function canAccessRoute(userRole: User['role'], route: string): boolean {
  const adminRoutes = ['/admin', '/admin/users', '/admin/content', '/admin/donations', '/admin/analytics'];
  const editorRoutes = ['/editor', '/editor/content', '/editor/events', '/editor/sermons'];
  const memberRoutes = ['/member', '/member/profile', '/member/donations'];

  switch (userRole) {
    case 'admin':
      return adminRoutes.includes(route) || editorRoutes.includes(route) || memberRoutes.includes(route);
    case 'editor':
      return editorRoutes.includes(route) || memberRoutes.includes(route);
    case 'member':
      return memberRoutes.includes(route);
    default:
      return false;
  }
}

export function validatePassword(password: string, config: AuthConfig['password']): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < config.minLength) {
    errors.push(`Password must be at least ${config.minLength} characters long`);
  }

  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (config.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getRoleDisplayName(role: User['role'], language: string = 'en'): string {
  const roleNames = {
    en: {
      admin: 'Administrator',
      editor: 'Content Editor',
      member: 'Church Member',
    },
    es: {
      admin: 'Administrador',
      editor: 'Editor de Contenido',
      member: 'Miembro de la Iglesia',
    },
    fr: {
      admin: 'Administrateur',
      editor: 'Éditeur de Contenu',
      member: 'Membre de l\'Église',
    },
    nl: {
      admin: 'Beheerder',
      editor: 'Content Editor',
      member: 'Kerk Lid',
    },
  };

  return roleNames[language as keyof typeof roleNames]?.[role] || roleNames.en[role];
}

export function getPermissionDisplayName(permission: string, language: string = 'en'): string {
  const permissionNames = {
    en: {
      manage_users: 'Manage Users',
      manage_content: 'Manage Content',
      manage_donations: 'Manage Donations',
      manage_events: 'Manage Events',
      manage_sermons: 'Manage Sermons',
      view_analytics: 'View Analytics',
      manage_settings: 'Manage Settings',
      access_admin_panel: 'Access Admin Panel',
      view_content: 'View Content',
      view_events: 'View Events',
      view_sermons: 'View Sermons',
      manage_profile: 'Manage Profile',
      make_donations: 'Make Donations',
      join_prayer_requests: 'Join Prayer Requests',
    },
    es: {
      manage_users: 'Gestionar Usuarios',
      manage_content: 'Gestionar Contenido',
      manage_donations: 'Gestionar Donaciones',
      manage_events: 'Gestionar Eventos',
      manage_sermons: 'Gestionar Sermones',
      view_analytics: 'Ver Analíticas',
      manage_settings: 'Gestionar Configuración',
      access_admin_panel: 'Acceder Panel Admin',
      view_content: 'Ver Contenido',
      view_events: 'Ver Eventos',
      view_sermons: 'Ver Sermones',
      manage_profile: 'Gestionar Perfil',
      make_donations: 'Hacer Donaciones',
      join_prayer_requests: 'Unir Peticiones de Oración',
    },
    fr: {
      manage_users: 'Gérer les Utilisateurs',
      manage_content: 'Gérer le Contenu',
      manage_donations: 'Gérer les Dons',
      manage_events: 'Gérer les Événements',
      manage_sermons: 'Gérer les Sermons',
      view_analytics: 'Voir les Analyses',
      manage_settings: 'Gérer les Paramètres',
      access_admin_panel: 'Accéder au Panneau Admin',
      view_content: 'Voir le Contenu',
      view_events: 'Voir les Événements',
      view_sermons: 'Voir les Sermons',
      manage_profile: 'Gérer le Profil',
      make_donations: 'Faire des Dons',
      join_prayer_requests: 'Rejoindre les Demandes de Prière',
    },
    nl: {
      manage_users: 'Beheer Gebruikers',
      manage_content: 'Beheer Content',
      manage_donations: 'Beheer Donaties',
      manage_events: 'Beheer Evenementen',
      manage_sermons: 'Beheer Preken',
      view_analytics: 'Bekijk Analytics',
      manage_settings: 'Beheer Instellingen',
      access_admin_panel: 'Toegang Admin Paneel',
      view_content: 'Bekijk Content',
      view_events: 'Bekijk Evenementen',
      view_sermons: 'Bekijk Preken',
      manage_profile: 'Beheer Profiel',
      make_donations: 'Maak Donaties',
      join_prayer_requests: 'Doe mee aan Gebedsverzoeken',
    },
  };

  return permissionNames[language as keyof typeof permissionNames]?.[permission as keyof typeof permissionNames.en] || permission;
}
