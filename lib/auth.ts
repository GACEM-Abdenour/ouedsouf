import type { UserRole } from "@/types/auth"

export function getDashboardPathForRole(role?: UserRole) {
  if (role === "admin") return "/admin"
  if (role === "artisan") return "/dashboard/artisan"
  return "/dashboard"
}
