-- Run this in the Supabase SQL Editor before enabling username-only signup.
-- Supabase Auth still stores a synthetic, non-deliverable email per username.

alter table public.profiles
  add column if not exists username text;

create unique index if not exists profiles_username_ci_unique
  on public.profiles (lower(username))
  where username is not null;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  chosen_username text;
begin
  chosen_username := lower(btrim(new.raw_user_meta_data ->> 'username'));

  if chosen_username is null or chosen_username !~ '^[a-z0-9_]{3,24}$' then
    raise exception 'A valid Hunter-Net username is required';
  end if;

  insert into public.profiles (id, username, display_name)
  values (new.id, chosen_username, chosen_username)
  on conflict (id) do update
    set username = excluded.username,
        display_name = excluded.display_name;

  return new;
end;
$$;
