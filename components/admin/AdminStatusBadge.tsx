import { Badge } from "@/components/ui/badge"

export function AdminStatusBadge({ status }: { status: string }) {
  return <Badge variant={status === "active" || status === "published" || status === "verified" ? "default" : "secondary"}>{status}</Badge>
}
