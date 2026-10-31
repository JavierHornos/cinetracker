-- Cinetracker: catálogo compartido + marcas por usuario.
-- Pegar entero en Supabase > SQL Editor > New query > Run.

-- ── Catálogo ────────────────────────────────────────────────────────────────
-- Una fila por película o serie. Las del libro y las de cine argentino vienen
-- cargadas; las que alguien suma a "Mi lista" se agregan con agregar_a_mi_lista().
create table public.peliculas (
  id              bigint generated always as identity primary key,
  tmdb_id         integer,
  media_type      text not null default 'movie' check (media_type in ('movie','tv')),
  titulo          text not null,              -- como figura en el libro o en tu lista
  titulo_tmdb     text,
  titulo_original text,
  anio            smallint,
  direccion       text,
  sinopsis        text,
  poster_path     text,
  backdrop_path   text,
  vote_average    numeric(3,1),
  trailer_youtube text,                       -- id del video de YouTube
  listas          text[] not null default '{}', -- '1001', 'cine_argentino', 'clasicos'
  pagina_libro    smallint,
  donde_ver       text,
  cruce           text not null default 'segura' check (cruce in ('segura','probable','dudosa')),
  candidatos      jsonb,                      -- opciones para el "¿Es esta?"
  creado_por      uuid default auth.uid() references auth.users(id) on delete set null,
  created_at      timestamptz not null default now()
);

create unique index peliculas_tmdb_uniq
  on public.peliculas (tmdb_id, media_type) where tmdb_id is not null;
create index peliculas_listas_idx on public.peliculas using gin (listas);

-- ── Administradores (pueden corregir el catálogo) ───────────────────────────
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = (select auth.uid()))
$$;

-- ── Marcas de cada usuario ──────────────────────────────────────────────────
create table public.marcas (
  user_id      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  pelicula_id  bigint not null references public.peliculas(id) on delete cascade,
  visto        boolean  not null default false,
  puntaje      smallint not null default 0 check (puntaje between 0 and 5),
  en_mi_lista  boolean  not null default false,
  agregado_at  timestamptz not null default now(),
  visto_at     timestamptz,
  primary key (user_id, pelicula_id)
);

create index marcas_pelicula_idx on public.marcas (pelicula_id);

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.peliculas enable row level security;
alter table public.admins    enable row level security;
alter table public.marcas    enable row level security;

-- Catálogo: lo ve cualquiera con sesión; solo los admins lo corrigen.
create policy "catalogo visible con sesion" on public.peliculas
  for select to authenticated using (true);
create policy "admins corrigen el catalogo" on public.peliculas
  for update to authenticated using ((select public.es_admin())) with check ((select public.es_admin()));

-- Admins: cada uno puede ver si él mismo es admin.
create policy "ver si soy admin" on public.admins
  for select to authenticated using ((select auth.uid()) = user_id);

-- Marcas: cada usuario ve y toca solo las suyas.
create policy "ver mis marcas" on public.marcas
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "crear mis marcas" on public.marcas
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "editar mis marcas" on public.marcas
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "borrar mis marcas" on public.marcas
  for delete to authenticated using ((select auth.uid()) = user_id);

grant select, update on public.peliculas to authenticated;
grant select on public.admins to authenticated;
grant select, insert, update, delete on public.marcas to authenticated;

-- ── Sumar una película de TMDB a "Mi lista" ─────────────────────────────────
-- La guarda en el catálogo si no estaba (sin listas, así no aparece en el libro
-- ni en cine argentino) y la marca en la lista del usuario.
create function public.agregar_a_mi_lista(
  p_tmdb_id integer, p_media_type text, p_titulo text,
  p_titulo_original text default null, p_anio smallint default null,
  p_sinopsis text default null, p_poster text default null,
  p_backdrop text default null, p_vote numeric default null,
  p_visto boolean default false, p_puntaje smallint default 0
) returns bigint
language plpgsql security definer set search_path = public as $$
declare v_id bigint;
begin
  if auth.uid() is null then raise exception 'Hace falta iniciar sesión'; end if;
  if p_media_type not in ('movie','tv') then raise exception 'media_type inválido'; end if;

  insert into peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio,
                         sinopsis, poster_path, backdrop_path, vote_average)
  values (p_tmdb_id, p_media_type, p_titulo, p_titulo, p_titulo_original, p_anio,
          p_sinopsis, p_poster, p_backdrop, p_vote)
  on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;

  select id into v_id from peliculas where tmdb_id = p_tmdb_id and media_type = p_media_type;

  insert into marcas (user_id, pelicula_id, en_mi_lista, visto, puntaje, visto_at)
  values (auth.uid(), v_id, true, p_visto, least(greatest(p_puntaje, 0), 5)::smallint,
          case when p_visto then now() end)
  on conflict (user_id, pelicula_id) do update
    set en_mi_lista = true,
        visto   = marcas.visto or excluded.visto,
        puntaje = greatest(marcas.puntaje, excluded.puntaje);

  return v_id;
end $$;

revoke execute on function public.agregar_a_mi_lista from public, anon;
grant execute on function public.agregar_a_mi_lista to authenticated;
