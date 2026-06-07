-- Run this in the Supabase SQL Editor after schema.sql.
--
-- Important:
-- 1. Create these accounts first using Supabase Auth or the app registration flow:
--    admin@wadsoufheritage.local
--    subscriber@wadsoufheritage.local
--    visitor@wadsoufheritage.local
--    weaver@wadsoufheritage.local
--    potter@wadsoufheritage.local
--    guide@wadsoufheritage.local
-- 2. Then run this script to enrich those users with profiles, artisan pages,
--    and marketplace listings.
--
-- This script does not insert into auth.users, so it works cleanly with normal
-- Supabase SQL Editor permissions and is safe to run more than once.

begin;

with demo_users as (
  select *
  from (
    values
      ('admin@wadsoufheritage.local', 'مدير المنصة', 'admin', 'none'),
      ('subscriber@wadsoufheritage.local', 'مشترك نشط', 'client', 'active'),
      ('visitor@wadsoufheritage.local', 'زائر السوق', 'client', 'none'),
      ('weaver@wadsoufheritage.local', 'عايشة الناسجة', 'artisan', 'none'),
      ('potter@wadsoufheritage.local', 'بيت مراد للفخار', 'artisan', 'none'),
      ('guide@wadsoufheritage.local', 'سليم الدليل التراثي', 'artisan', 'none')
  ) as seed(email, full_name, app_role, subscription_status)
),
matched_auth_users as (
  select
    auth_users.id,
    demo_users.email,
    demo_users.full_name,
    demo_users.app_role,
    demo_users.subscription_status
  from demo_users
  join auth.users as auth_users on auth_users.email = demo_users.email
)
insert into public.profiles (id, name, email, role, subscription_status)
select
  matched_auth_users.id,
  matched_auth_users.full_name,
  matched_auth_users.email,
  matched_auth_users.app_role,
  matched_auth_users.subscription_status
from matched_auth_users
on conflict (id) do update
set
  name = excluded.name,
  email = excluded.email,
  role = excluded.role,
  subscription_status = excluded.subscription_status,
  updated_at = now();

with artisan_seed as (
  select *
  from (
    values
      (
        'weaver@wadsoufheritage.local',
        'عايشة الناسجة',
        'مشغل نول سوف',
        'Handwoven palm and wool pieces for homes, gifts, and heritage displays.',
        'حرف يدوية مستوحاة من نسيج وادي سوف مع تنفيذ حسب الطلب للمجالس والمنازل.',
        'El Oued',
        array['hand-weaving']::text[],
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
        '+213 555 010 101',
        '+213555010101',
        true
      ),
      (
        'potter@wadsoufheritage.local',
        'بيت مراد للفخار',
        'بيت مراد للفخار',
        'Traditional pottery and decorative ceramics shaped with local patterns.',
        'صناعة فخار وخزف يدوي برسومات مستوحاة من البيئة المحلية في وادي سوف.',
        'Guemar',
        array['pottery']::text[],
        'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80',
        '+213 555 020 202',
        '+213555020202',
        true
      ),
      (
        'guide@wadsoufheritage.local',
        'سليم الدليل التراثي',
        'جولات دروب الواحة',
        'Private walks and small group introductions to oasis life, domes, and old neighborhoods.',
        'مرافقة الزوار في جولات تعريفية مبسطة حول الواحة والعمارة والحياة اليومية القديمة.',
        'El Oued',
        array['guide', 'workshop']::text[],
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        '+213 555 030 303',
        '+213555030303',
        false
      )
  ) as seed(email, display_name, workshop_name, bio_en, bio_ar, location, categories, profile_image, phone, whatsapp, is_verified)
),
artisan_targets as (
  select
    profiles.id as user_id,
    profiles.email,
    artisan_seed.display_name,
    artisan_seed.workshop_name,
    artisan_seed.bio_en,
    artisan_seed.bio_ar,
    artisan_seed.location,
    artisan_seed.categories,
    artisan_seed.profile_image,
    artisan_seed.phone,
    artisan_seed.whatsapp,
    artisan_seed.is_verified
  from artisan_seed
  join public.profiles as profiles on profiles.email = artisan_seed.email
)
insert into public.artisan_profiles (
  user_id,
  display_name,
  workshop_name,
  bio_en,
  bio_ar,
  location,
  categories,
  profile_image,
  phone,
  email,
  whatsapp,
  is_verified,
  is_public
)
select
  artisan_targets.user_id,
  artisan_targets.display_name,
  artisan_targets.workshop_name,
  artisan_targets.bio_en,
  artisan_targets.bio_ar,
  artisan_targets.location,
  artisan_targets.categories,
  artisan_targets.profile_image,
  artisan_targets.phone,
  artisan_targets.email,
  artisan_targets.whatsapp,
  artisan_targets.is_verified,
  true
from artisan_targets
where not exists (
  select 1
  from public.artisan_profiles as artisan_profiles
  where artisan_profiles.user_id = artisan_targets.user_id
);

with service_seed as (
  select *
  from (
    values
      (
        'weaver@wadsoufheritage.local',
        'Custom woven room accents',
        'مفروشات منسوجة حسب الطلب',
        'Handmade woven mats, wall hangings, and custom color sets for homes and guest spaces.',
        'تصميم زرابي ومعلقات منسوجة يدويا بألوان تناسب البيوت وفضاءات الضيافة.',
        'hand-weaving',
        'El Oued',
        array[
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
        ]::text[],
        '+213 555 010 101',
        'weaver@wadsoufheritage.local',
        '+213555010101',
        true
      ),
      (
        'potter@wadsoufheritage.local',
        'Decorative pottery for homes and cafes',
        'فخار وزينة للمنازل والمقاهي',
        'Serving trays, table pieces, and small-batch pottery shaped with Soufi-inspired details.',
        'أطباق تقديم وقطع زينة وفخار مصنوع يدويا بلمسات مستوحاة من طابع سوف.',
        'pottery',
        'Guemar',
        array[
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80'
        ]::text[],
        '+213 555 020 202',
        'potter@wadsoufheritage.local',
        '+213555020202',
        true
      ),
      (
        'guide@wadsoufheritage.local',
        'Oasis walk and dome architecture tour',
        'جولة الواحة والقباب',
        'A guided introduction for visitors who want a simple, local explanation of neighborhoods, domes, and daily oasis culture.',
        'جولة تعريفية للزوار حول الأحياء القديمة والقباب وثقافة الحياة اليومية في الواحة.',
        'guide',
        'El Oued',
        array[
          'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80'
        ]::text[],
        '+213 555 030 303',
        'guide@wadsoufheritage.local',
        '+213555030303',
        true
      ),
      (
        'guide@wadsoufheritage.local',
        'School heritage workshop',
        'ورشة تراثية للمدارس',
        'Short educational session for schools or clubs about oasis heritage and traditional life.',
        'حصة قصيرة للمدارس والنوادي حول تراث الواحات والحياة التقليدية في وادي سوف.',
        'workshop',
        'El Oued',
        array[
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'
        ]::text[],
        '+213 555 030 303',
        'guide@wadsoufheritage.local',
        '+213555030303',
        true
      )
  ) as seed(email, title_en, title_ar, description_en, description_ar, category, location, images, phone, service_email, whatsapp, is_published)
),
service_targets as (
  select
    artisan_profiles.id as artisan_id,
    service_seed.title_en,
    service_seed.title_ar,
    service_seed.description_en,
    service_seed.description_ar,
    service_seed.category,
    service_seed.location,
    service_seed.images,
    service_seed.phone,
    service_seed.service_email,
    service_seed.whatsapp,
    service_seed.is_published
  from service_seed
  join public.artisan_profiles as artisan_profiles on artisan_profiles.email = service_seed.email
)
insert into public.artisan_services (
  artisan_id,
  title_en,
  title_ar,
  description_en,
  description_ar,
  category,
  location,
  images,
  phone,
  email,
  whatsapp,
  is_published
)
select
  service_targets.artisan_id,
  service_targets.title_en,
  service_targets.title_ar,
  service_targets.description_en,
  service_targets.description_ar,
  service_targets.category,
  service_targets.location,
  service_targets.images,
  service_targets.phone,
  service_targets.service_email,
  service_targets.whatsapp,
  service_targets.is_published
from service_targets
where not exists (
  select 1
  from public.artisan_services as artisan_services
  where artisan_services.artisan_id = service_targets.artisan_id
    and artisan_services.title_en = service_targets.title_en
);

commit;

-- Suggested demo password when creating these users:
-- DemoPassword123!
