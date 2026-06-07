import type { HeritageUser, UserRole } from "@/types/auth"

export function hasRole(user: HeritageUser | null, allowedRoles: UserRole[]) {
  return Boolean(user && allowedRoles.includes(user.role))
}

export function canAccessDashboard(user: HeritageUser | null) {
  return Boolean(user)
}

export function canManageArtisanArea(user: HeritageUser | null) {
  return hasRole(user, ["artisan", "admin"])
}

export function canAccessAdmin(user: HeritageUser | null) {
  return hasRole(user, ["admin"])
}
