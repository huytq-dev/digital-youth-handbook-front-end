export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
export const ALL_ROLES = Object.values(ROLES);
