import { NextResponse } from "next/server"
import { CERTIFIED_HERITAGE_DURATION_DAYS } from "@/lib/certified-payment-config"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { getServerAuthState } from "@/lib/supabase/server-auth"
import type { CertifiedPaymentRow } from "@/lib/supabase/types"
import type { CertifiedPaymentStatus } from "@/types/certified-payment"

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { profile } = await getServerAuthState()
  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = getSupabaseAdminClient()
  if (!supabase) {
    return NextResponse.json({ error: "Missing Supabase service role key." }, { status: 500 })
  }

  const { id } = await context.params
  const body = await request.json().catch(() => ({}))
  const status = body.status as CertifiedPaymentStatus | undefined
  const adminNote = typeof body.adminNote === "string" ? body.adminNote.trim() : null

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "Invalid payment status." }, { status: 400 })
  }

  const { data: payment, error: paymentError } = await supabase
    .from("certified_payments")
    .select("*")
    .eq("id", id)
    .single<CertifiedPaymentRow>()

  if (paymentError || !payment) {
    return NextResponse.json({ error: paymentError?.message ?? "Payment not found." }, { status: 404 })
  }

  const reviewedAt = new Date().toISOString()
  const { error: updatePaymentError } = await supabase
    .from("certified_payments")
    .update({
      status,
      admin_note: adminNote || null,
      reviewed_by: profile.id,
      reviewed_at: reviewedAt,
    })
    .eq("id", id)

  if (updatePaymentError) {
    return NextResponse.json({ error: updatePaymentError.message }, { status: 500 })
  }

  if (status === "approved") {
    const expiresAt = new Date(Date.now() + CERTIFIED_HERITAGE_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        subscription_status: "active",
        subscription_started_at: reviewedAt,
        subscription_expires_at: expiresAt,
      })
      .eq("id", payment.user_id)

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
