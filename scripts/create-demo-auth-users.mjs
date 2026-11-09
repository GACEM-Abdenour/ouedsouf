import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY in environment.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const publicAuthClient = createClient(supabaseUrl, anonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const demoPassword = "DemoPassword123!"

const demoUsers = [
  {
    email: "admin.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "مدير المنصة", role: "client" },
    app_metadata: { role: "client" },
  },
  {
    email: "subscriber.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "مشترك نشط", role: "client" },
    app_metadata: { role: "client" },
  },
  {
    email: "visitor.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "زائر السوق", role: "client" },
    app_metadata: { role: "client" },
  },
  {
    email: "weaver.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "عايشة الناسجة", role: "artisan" },
    app_metadata: { role: "artisan" },
  },
  {
    email: "potter.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "بيت مراد للفخار", role: "artisan" },
    app_metadata: { role: "artisan" },
  },
  {
    email: "guide.demo@example.com",
    password: demoPassword,
    email_confirm: true,
    user_metadata: { name: "سليم الدليل التراثي", role: "artisan" },
    app_metadata: { role: "artisan" },
  },
]

async function clearDemoPublicRows() {
  const demoEmails = demoUsers.map((user) => user.email)

  const { data: artisanProfiles, error: artisanProfilesError } = await supabase
    .from("artisan_profiles")
    .select("id")
    .in("email", demoEmails)

  if (artisanProfilesError) throw artisanProfilesError

  const artisanIds = artisanProfiles.map((profile) => profile.id)

  if (artisanIds.length > 0) {
    const { error: servicesDeleteError } = await supabase
      .from("artisan_services")
      .delete()
      .in("artisan_id", artisanIds)

    if (servicesDeleteError) throw servicesDeleteError
  }

  const { error: artisanDeleteError } = await supabase
    .from("artisan_profiles")
    .delete()
    .in("email", demoEmails)

  if (artisanDeleteError) throw artisanDeleteError

  const { error: profilesDeleteError } = await supabase
    .from("profiles")
    .delete()
    .in("email", demoEmails)

  if (profilesDeleteError) throw profilesDeleteError
}

async function main() {
  await clearDemoPublicRows()
  const results = []

  for (const demoUser of demoUsers) {
    const { error } = await supabase.auth.admin.createUser(demoUser)

    if (error) {
      const message = error.message.toLowerCase()
      if (message.includes("already been registered") || message.includes("already registered") || message.includes("already exists")) {
        results.push(`already exists ${demoUser.email}`)
        continue
      }

      const signupPayload = {
        email: demoUser.email,
        password: demoUser.password,
        options: {
          data: demoUser.user_metadata,
        },
      }

      const { error: signupError } = await publicAuthClient.auth.signUp(signupPayload)

      if (signupError) {
        const signupMessage = signupError.message.toLowerCase()
        if (signupMessage.includes("already been registered") || signupMessage.includes("already registered") || signupMessage.includes("already exists")) {
          results.push(`already exists ${demoUser.email}`)
          continue
        }
        throw signupError
      }

      results.push(`created via signup ${demoUser.email}`)
      continue
    }

    results.push(`created ${demoUser.email}`)
  }

  console.log("Demo Auth users ready:")
  for (const result of results) {
    console.log(`- ${result}`)
  }
  console.log(`Password for all demo users: ${demoPassword}`)
}

main().catch((error) => {
  console.error("Failed to create demo auth users.")
  console.error(error.message ?? error)
  process.exit(1)
})
