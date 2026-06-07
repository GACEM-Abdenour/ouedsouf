import type { LocalizedText } from "./artisan"

export type CertifiedContentType = "library" | "collection" | "document"

export interface CertifiedHeritageItem {
  id: string
  type: CertifiedContentType
  title: LocalizedText
  summary: LocalizedText
  author: string
  readTime: string
  isLocked: boolean
  isPublished: boolean
  publishedAt: string
}
