import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { getServerAuthState } from "@/lib/supabase/server-auth"

export async function GET(request: Request) {
  const { profile } = await getServerAuthState()
  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = getSupabaseAdminClient()
  if (!supabase) {
    return NextResponse.json({ error: "Missing Supabase service role key." }, { status: 500 })
  }

  const path = new URL(request.url).searchParams.get("path")
  if (!path) {
    return NextResponse.json({ error: "Missing receipt path." }, { status: 400 })
  }

  const { data, error } = await supabase.storage.from("payment-receipts").createSignedUrl(path, 60)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}
