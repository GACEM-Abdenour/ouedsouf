export type CertifiedPaymentStatus = "pending" | "approved" | "rejected"

export interface CertifiedPayment {
  id: string
  userId: string
  amount: number
  currency: string
  paymentMethod?: string
  receiptPath: string
  status: CertifiedPaymentStatus
  adminNote?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
  userName?: string
  userEmail?: string
}
