You are upgrading an existing **Next.js App Router** project called **Wadi Souf Heritage**.

The current project is a bilingual English/Arabic heritage platform built with:

* Next.js App Router
* Tailwind CSS
* Radix UI components
* Custom language context for English / Arabic
* RTL support for Arabic
* Existing pages:

  * `/`
  * `/sites`
  * `/history`
  * `/figures`
  * `/crafts`
  * `/architecture`
  * `/traditions`
  * `/clothing`
  * `/gallery`
  * `/about-project`
  * `/about-wad-souf`
  * `/sources`

The existing website is mainly informational. It presents heritage sites, history, cultural figures, crafts, architecture, traditions, clothing, gallery content, project information, and sources.

Now I want to upgrade the platform with **authentication, subscriptions, certified heritage access, and a simplified artisan marketplace**.

Do not rewrite the whole project from scratch. Preserve the current design language, bilingual system, routing structure, Tailwind styling, Radix UI accessibility, and existing content pages. Add the new features cleanly on top of the existing app.

---

# Main Goal

Transform the platform into a heritage discovery website with three layers:

1. **Public Heritage Content**

   * Visitors can browse most heritage pages without logging in.
   * Pages like home, sites, history, figures, crafts, architecture, traditions, clothing, gallery, about pages, and sources should remain publicly accessible unless explicitly marked as certified content.

2. **Certified Heritage Subscription Area**

   * Some premium or verified heritage material should be locked behind a subscription.
   * Users must create an account and have an active subscription to access certified heritage content.
   * This should feel like a “Certified Heritage” section, not like a generic paywall.

3. **Simplified Artisan Marketplace**

   * Artisans can create accounts, log in, and publish their services/information.
   * Clients/visitors do **not** need to log in to browse artisan services.
   * The platform does **not** take profit, commission, or handle transactions.
   * It is only a discovery/listing marketplace where artisans publish their services and clients contact them directly.
   * Keep the marketplace simple and avoid complex e-commerce features.

---

# Important Business Rules

## Authentication

Add user authentication with these account types:

* `client`
* `artisan`
* `admin`

For now, clients are optional. Visitors should still be able to browse services without login.

Use a clean role-based structure so future changes are easy.

Required auth pages:

* `/login`
* `/register`
* `/dashboard`
* `/dashboard/profile`
* `/dashboard/settings`

Registration should allow a user to choose:

* Client account
* Artisan account

Admin accounts should not be created publicly from the registration page.

---

## Certified Heritage Subscription

Add a subscription system for accessing certified heritage.

Create a new section:

* `/certified-heritage`

This page should explain that certified heritage gives access to verified, curated, or expert-backed heritage materials.

Example certified content types:

* verified historical notes
* expert-reviewed site descriptions
* downloadable educational material
* certified cultural research summaries
* guided heritage collections
* premium photo/archive collections

Access rules:

* Visitors who are not logged in can see the landing/explanation page for Certified Heritage.
* Logged-in users without subscription can see the benefits and subscription CTA.
* Only logged-in users with active subscription can access the protected certified content.

Create protected pages such as:

* `/certified-heritage/library`
* `/certified-heritage/collections`
* `/certified-heritage/documents`

If the user is not subscribed, redirect or show a clear locked-content message.

Do not implement real payment processing unless the project already has payment integration. Instead, create the structure so payment can be added later.

Use a subscription status field such as:

```ts
subscriptionStatus: "none" | "active" | "expired"
```

For development/demo purposes, allow admin or mock data to mark a user as subscribed.

---

# Artisan Marketplace

Add a marketplace section focused on local artisans and heritage services.

Create public pages:

* `/artisans`
* `/artisans/[id]`
* `/artisans/category/[category]`

Visitors should be able to:

* browse artisan listings
* filter by craft/service category
* search by name, craft, location, or keyword
* open an artisan profile
* see contact information if the artisan chooses to publish it

Visitors should **not** need to log in.

The platform must clearly state:

> The platform does not process payments, take commissions, or guarantee transactions. It only helps visitors discover artisans and contact them directly.

Add this disclaimer in the artisan marketplace pages.

---

## Artisan Account Area

When a user registers as an artisan, they should get access to artisan dashboard features.

Create dashboard pages:

* `/dashboard/artisan`
* `/dashboard/artisan/profile`
* `/dashboard/artisan/services`
* `/dashboard/artisan/services/new`
* `/dashboard/artisan/services/[id]/edit`

Artisans should be able to:

* create and edit their public artisan profile
* add their name or workshop name
* add location
* add phone number
* add email
* add WhatsApp link or phone number
* add short bio
* add Arabic and English descriptions if possible
* upload or add image URLs for their work
* select craft/service categories
* create service listings
* edit service listings
* hide/unpublish service listings

Service listing fields should include:

```ts
id: string
artisanId: string
title: {
  en: string
  ar: string
}
description: {
  en: string
  ar: string
}
category: string
location: string
images: string[]
contactMethod: {
  phone?: string
  email?: string
  whatsapp?: string
}
isPublished: boolean
createdAt: string
updatedAt: string
```

Artisan profile fields should include:

```ts
id: string
userId: string
displayName: string
workshopName?: string
bio: {
  en: string
  ar: string
}
location: string
categories: string[]
profileImage?: string
coverImage?: string
phone?: string
email?: string
whatsapp?: string
isVerified: boolean
isPublic: boolean
createdAt: string
updatedAt: string
```

---

# Marketplace Categories

Use heritage-related artisan categories such as:

* Hand Weaving
* Pottery and Ceramics
* Palm Weaving
* Traditional Carpentry
* Traditional Jewelry
* Leather Tanning
* Traditional Clothing
* Traditional Food
* Cultural Guide
* Heritage Workshop
* Other

Each category should support English and Arabic labels.

---

# Client Accounts

Client accounts should be very simple.

Clients can:

* log in
* manage basic profile information
* optionally save favorite artisans or services if simple to implement

Do not create complicated client flows.

Clients do **not** need to log in to browse or contact artisans.

Avoid features like:

* checkout
* cart
* payment
* booking engine
* order management
* commission system
* reviews/ratings unless very simple and optional
* disputes
* invoices

The goal is to simplify marketplace complexity.

---

# Admin Area

Add a basic admin structure if not already present.

Admin should be able to:

* view users
* view artisans
* verify artisans
* hide/unpublish inappropriate listings
* manage certified heritage content
* manually update subscription status for demo/development

Create admin pages:

* `/admin`
* `/admin/users`
* `/admin/artisans`
* `/admin/services`
* `/admin/certified-heritage`
* `/admin/subscriptions`

Protect these routes so only users with role `admin` can access them.

If full backend is not available, create mock admin UI and clearly separate mock data/services from real implementation.

---

# Data Layer

Use a clean data model.

If the project already has a backend/database, integrate with the existing approach.

If there is no backend yet, create a temporary mock data layer using files such as:

* `lib/mock-users.ts`
* `lib/mock-artisans.ts`
* `lib/mock-services.ts`
* `lib/mock-certified-heritage.ts`

But structure the code so it can later be replaced by a real database such as PostgreSQL or Supabase.

Create TypeScript types in:

* `types/auth.ts`
* `types/artisan.ts`
* `types/service.ts`
* `types/subscription.ts`
* `types/certified-heritage.ts`

Use clear interfaces and avoid mixing UI code with data logic.

---

# Authentication Implementation Guidance

Use the simplest appropriate auth approach for this project.

If the project already has an auth library, extend it.

If not, prepare the structure for one of these:

* NextAuth/Auth.js
* Supabase Auth
* Clerk

Do not hardcode insecure production authentication.

For now, it is acceptable to create placeholder/mock auth context if needed, but make it clear in the code comments that it is for development only.

Required auth utilities:

* current user getter
* role checker
* subscription checker
* route protection helper
* dashboard redirects based on role

Example behavior:

* unauthenticated user accessing `/dashboard` should go to `/login`
* artisan user accessing `/dashboard` should see artisan dashboard shortcuts
* client user accessing `/dashboard` should see basic client dashboard
* admin user accessing `/dashboard` can see admin shortcut
* unsubscribed user accessing `/certified-heritage/library` should see locked message or redirect to `/certified-heritage`

---

# UI / UX Requirements

Keep the design aligned with the current Wadi Souf Heritage identity:

* desert-inspired palette
* warm cultural feeling
* elegant heritage cards
* bilingual text
* Arabic RTL layout
* responsive mobile navigation
* accessible Radix UI components

Add navigation items:

Main navigation:

* Heritage
* Gallery
* Artisans
* Certified Heritage
* About
* Login / Dashboard depending on auth state

For logged-in users:

* Show Dashboard instead of Login
* Optionally show user menu

For artisans:

* Show “My Artisan Profile” or “Artisan Dashboard”

For admins:

* Show “Admin” link

---

# Bilingual Requirements

Every new page and important UI label must support English and Arabic.

Add translations for:

* Login
* Register
* Dashboard
* Certified Heritage
* Subscribe
* Active Subscription
* Locked Content
* Artisan Marketplace
* Browse Artisans
* Artisan Profile
* Add Service
* Edit Service
* Contact Artisan
* No Commission
* The platform does not process payments
* Admin
* Manage Users
* Manage Artisans
* Verify Artisan
* Published / Unpublished

Preserve the current language context and RTL behavior.

Do not create English-only pages.

---

# Certified Heritage UI Suggestions

The `/certified-heritage` page should include:

* hero section
* explanation of certified heritage
* benefits grid
* sample locked content cards
* subscription CTA
* FAQ/disclaimer section

Example page sections:

1. Hero:

   * “Certified Heritage Access”
   * Arabic equivalent
   * Short explanation about verified and curated heritage knowledge.

2. Benefits:

   * Expert-reviewed material
   * Educational resources
   * Verified cultural collections
   * Archive-style documents

3. Access status card:

   * Not logged in: “Log in or create an account to subscribe.”
   * Logged in without subscription: “Subscribe to unlock certified heritage.”
   * Active subscription: “Your subscription is active. Enter the library.”

4. Content preview cards:

   * locked cards for library, collections, documents

---

# Artisan Marketplace UI Suggestions

The `/artisans` page should include:

* marketplace hero
* search bar
* category filters
* artisan/service cards
* no-commission disclaimer
* CTA for artisans to register

Example text:

English:

> Discover local artisans, traditional services, and cultural workshops from Wad Souf. This platform helps visitors connect directly with artisans. We do not process payments or take commissions.

Arabic:

> اكتشف الحرفيين المحليين والخدمات التقليدية وورشات التراث في وادي سوف. تساعد هذه المنصة الزوار على التواصل المباشر مع الحرفيين. نحن لا نعالج المدفوعات ولا نأخذ عمولات.

Artisan cards should show:

* image
* artisan/workshop name
* category
* location
* short description
* contact button
* view profile button
* verified badge if `isVerified` is true

---

# Route Protection

Create reusable route protection logic.

Protected routes:

* `/dashboard/*` requires login
* `/dashboard/artisan/*` requires role `artisan` or `admin`
* `/admin/*` requires role `admin`
* `/certified-heritage/library` requires active subscription
* `/certified-heritage/collections` requires active subscription
* `/certified-heritage/documents` requires active subscription

Public routes:

* `/`
* `/sites`
* `/history`
* `/figures`
* `/crafts`
* `/architecture`
* `/traditions`
* `/clothing`
* `/gallery`
* `/about-project`
* `/about-wad-souf`
* `/sources`
* `/artisans`
* `/artisans/[id]`
* `/artisans/category/[category]`
* `/certified-heritage`

---

# Suggested File Structure

Add or update files in a structure similar to this:

```txt
app/
  login/
    page.tsx
  register/
    page.tsx
  dashboard/
    page.tsx
    profile/
      page.tsx
    settings/
      page.tsx
    artisan/
      page.tsx
      profile/
        page.tsx
      services/
        page.tsx
        new/
          page.tsx
        [id]/
          edit/
            page.tsx
  artisans/
    page.tsx
    [id]/
      page.tsx
    category/
      [category]/
        page.tsx
  certified-heritage/
    page.tsx
    library/
      page.tsx
    collections/
      page.tsx
    documents/
      page.tsx
  admin/
    page.tsx
    users/
      page.tsx
    artisans/
      page.tsx
    services/
      page.tsx
    certified-heritage/
      page.tsx
    subscriptions/
      page.tsx

components/
  auth/
    LoginForm.tsx
    RegisterForm.tsx
    UserMenu.tsx
    ProtectedRoute.tsx
  artisans/
    ArtisanCard.tsx
    ArtisanFilters.tsx
    ArtisanProfileForm.tsx
    ServiceForm.tsx
    ServiceCard.tsx
    MarketplaceDisclaimer.tsx
  certified-heritage/
    CertifiedHero.tsx
    SubscriptionStatusCard.tsx
    LockedContentCard.tsx
    CertifiedContentCard.tsx
  dashboard/
    DashboardShell.tsx
    DashboardNav.tsx
  admin/
    AdminTable.tsx
    AdminStatusBadge.tsx

lib/
  auth.ts
  permissions.ts
  subscription.ts
  marketplace.ts
  mock-users.ts
  mock-artisans.ts
  mock-services.ts
  mock-certified-heritage.ts

types/
  auth.ts
  artisan.ts
  service.ts
  subscription.ts
  certified-heritage.ts
```

Adapt this to the actual project structure if the existing project uses different conventions.

---

# Implementation Priorities

Work in this order:

1. Add TypeScript types for users, roles, subscriptions, artisans, services, and certified content.
2. Add mock data layer or connect to existing backend if available.
3. Add auth pages and mock/auth structure.
4. Add route protection utilities.
5. Add Certified Heritage public page and protected pages.
6. Add Artisan Marketplace public browsing pages.
7. Add Artisan dashboard pages for profile and service management.
8. Add Admin pages for basic moderation and subscription management.
9. Update navigation/header for new routes and auth-aware links.
10. Add bilingual translations for all new labels.
11. Ensure responsive design and RTL support.
12. Test route access behavior for public, logged-out, client, artisan, admin, subscribed, and unsubscribed states.

---

# Acceptance Criteria

The upgrade is successful when:

* Existing heritage pages still work.
* English/Arabic toggle still works.
* Arabic layout remains RTL.
* Visitors can browse artisan services without logging in.
* Artisans can register/login and manage their profile/services.
* Clients can register/login but do not need accounts to browse artisans.
* Certified Heritage has a public explanation page.
* Certified Heritage protected content is accessible only to subscribed users.
* Admin routes are protected.
* Marketplace has no checkout, commission, payment, cart, or order system.
* Navigation includes Artisans and Certified Heritage.
* The code is modular, typed, and easy to replace with a real backend later.
* No existing heritage content is removed.
* UI remains consistent with the current cultural/desert heritage identity.

---

# Important Constraint

Do not overbuild the marketplace.

This is not an e-commerce platform.

It is only a simple discovery platform where:

* artisans publish their information and services
* visitors browse and contact artisans directly
* the platform takes no profit
* the platform does not manage payments
* the platform does not handle orders
* the platform does not guarantee deals between artisans and clients

Keep the implementation simple, clean, and maintainable.
