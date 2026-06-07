create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique not null,
  role text not null default 'client' check (role in ('client', 'artisan', 'admin')),
  subscription_status text not null default 'none' check (subscription_status in ('none', 'active', 'expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artisan_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  workshop_name text,
  bio_en text,
  bio_ar text,
  location text,
  categories text[] not null default '{}',
  profile_image text,
  cover_image text,
  phone text,
  email text,
  whatsapp text,
  is_verified boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artisan_services (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references public.artisan_profiles(id) on delete cascade,
  title_en text not null,
  title_ar text,
  description_en text,
  description_ar text,
  category text not null,
  location text,
  images text[] not null default '{}',
  phone text,
  email text,
  whatsapp text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certified_heritage_items (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text,
  description_en text,
  description_ar text,
  content_en text,
  content_ar text,
  type text not null check (type in ('library', 'collection', 'document')),
  image_url text,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_subscription_status_idx on public.profiles(subscription_status);
create index if not exists artisan_profiles_user_id_idx on public.artisan_profiles(user_id);
create index if not exists artisan_profiles_is_public_idx on public.artisan_profiles(is_public);
create index if not exists artisan_services_artisan_id_idx on public.artisan_services(artisan_id);
create index if not exists artisan_services_is_published_idx on public.artisan_services(is_published);
create index if not exists certified_heritage_items_type_idx on public.certified_heritage_items(type);
create index if not exists certified_heritage_items_is_published_idx on public.certified_heritage_items(is_published);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_artisan_profiles_updated_at on public.artisan_profiles;
create trigger set_artisan_profiles_updated_at
before update on public.artisan_profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_artisan_services_updated_at on public.artisan_services;
create trigger set_artisan_services_updated_at
before update on public.artisan_services
for each row
execute function public.set_updated_at();

drop trigger if exists set_certified_heritage_items_updated_at on public.certified_heritage_items;
create trigger set_certified_heritage_items_updated_at
before update on public.certified_heritage_items
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role, subscription_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    case
      when coalesce(new.raw_user_meta_data ->> 'role', 'client') in ('client', 'artisan')
        then new.raw_user_meta_data ->> 'role'
      else 'client'
    end,
    'none'
  )
  on conflict (id) do update
  set name = excluded.name,
      email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.current_user_subscription_status()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select subscription_status
      from public.profiles
      where id = auth.uid()
    ),
    'none'
  );
$$;

alter table public.profiles enable row level security;
alter table public.artisan_profiles enable row level security;
alter table public.artisan_services enable row level security;
alter table public.certified_heritage_items enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
using (auth.uid() = id or public.is_admin())
with check (
  (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()))
  or public.is_admin()
);

drop policy if exists "artisan_profiles_public_read" on public.artisan_profiles;
create policy "artisan_profiles_public_read"
on public.artisan_profiles
for select
using (is_public = true or auth.uid() = user_id or public.is_admin());

drop policy if exists "artisan_profiles_create_own" on public.artisan_profiles;
create policy "artisan_profiles_create_own"
on public.artisan_profiles
for insert
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "artisan_profiles_update_own_or_admin" on public.artisan_profiles;
create policy "artisan_profiles_update_own_or_admin"
on public.artisan_profiles
for update
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "artisan_services_public_read" on public.artisan_services;
create policy "artisan_services_public_read"
on public.artisan_services
for select
using (
  (
    is_published = true
    and exists (
      select 1
      from public.artisan_profiles ap
      where ap.id = artisan_id
        and ap.is_public = true
    )
  )
  or exists (
    select 1
    from public.artisan_profiles ap
    where ap.id = artisan_id
      and ap.user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "artisan_services_manage_own_or_admin" on public.artisan_services;
create policy "artisan_services_manage_own_or_admin"
on public.artisan_services
for all
using (
  exists (
    select 1
    from public.artisan_profiles ap
    where ap.id = artisan_id
      and (ap.user_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.artisan_profiles ap
    where ap.id = artisan_id
      and (ap.user_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "certified_items_subscribed_read" on public.certified_heritage_items;
create policy "certified_items_subscribed_read"
on public.certified_heritage_items
for select
using (
  (
    is_published = true
    and auth.uid() is not null
    and public.current_user_subscription_status() = 'active'
  )
  or public.is_admin()
);

drop policy if exists "certified_items_admin_manage" on public.certified_heritage_items;
create policy "certified_items_admin_manage"
on public.certified_heritage_items
for all
using (public.is_admin())
with check (public.is_admin());

insert into public.artisan_profiles (
  id,
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
  gen_random_uuid(),
  p.id,
  'Sample Artisan',
  'Souf Craft Studio',
  'Demo artisan profile for marketplace layout testing.',
  'ملف حرفي تجريبي لاختبار واجهة السوق.',
  'El Oued',
  array['hand-weaving'],
  'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=900&q=80',
  '+213 555 000 000',
  p.email,
  '+213555000000',
  true,
  true
from public.profiles p
where p.role = 'artisan'
  and not exists (
    select 1
    from public.artisan_profiles ap
    where ap.user_id = p.id
  );

insert into public.certified_heritage_items (
  title_en,
  title_ar,
  description_en,
  description_ar,
  content_en,
  content_ar,
  type,
  image_url,
  is_published
)
select *
from (
  values
    (
      'Expert Note on Soufi Domes',
      'مذكرة خبراء حول القباب السوفية',
      'A reviewed note on thermal comfort, materials, and symbolic form in dome architecture.',
      'مذكرة مراجعة حول الراحة الحرارية والمواد والدلالة في عمارة القباب.',
      'Protected sample content in English.',
      'محتوى تجريبي محمي بالعربية.',
      'library',
      null,
      true
    ),
    (
      'Guided Oasis Collections',
      'مجموعات الواحات الموجهة',
      'Curated photos and notes for educators introducing oasis life and water culture.',
      'صور وملاحظات منتقاة للمعلمين حول حياة الواحات وثقافة الماء.',
      'Protected sample collection content in English.',
      'محتوى مجموعة تجريبية محمية بالعربية.',
      'collection',
      null,
      true
    ),
    (
      'Traditional Crafts Education Pack',
      'حزمة تعليمية عن الحرف التقليدية',
      'Downloadable lesson prompts and research summaries for heritage clubs.',
      'محاور دروس وملخصات بحثية قابلة للتحميل لنوادي التراث.',
      'Protected sample document content in English.',
      'محتوى وثيقة تجريبية محمية بالعربية.',
      'document',
      null,
      true
    )
) as seed(title_en, title_ar, description_en, description_ar, content_en, content_ar, type, image_url, is_published)
where not exists (
  select 1 from public.certified_heritage_items chi where chi.title_en = seed.title_en
);

-- Optional admin promotion after registering normally:
-- update public.profiles
-- set role = 'admin'
-- where email = 'YOUR_EMAIL_HERE';
