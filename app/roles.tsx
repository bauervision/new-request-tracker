// roles.ts

interface Roles {
  [key: string]: {
    canAccess: string[];
  };
}

export const roles: Roles = {
  super_admin: {
    canAccess: ["dashboard", "settings", "users", "site"],
  },
  admin: {
    canAccess: ["dashboard", "settings", "users"],
  },
  user: {
    canAccess: ["dashboard"],
  },
  guest: {
    canAccess: [],
  },
};
