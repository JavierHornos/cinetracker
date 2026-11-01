-- Fichas de personas: desde la filmografía de un director, director de fotografía o
-- montajista se puede marcar como vista una película que todavía no está en el catálogo.
-- Esta función la suma al catálogo (sin listas y sin tocar "Mi lista") y devuelve su id.

create function public.asegurar_pelicula(
  p_tmdb_id integer, p_media_type text, p_titulo text,
  p_titulo_original text default null, p_anio smallint default null,
  p_sinopsis text default null, p_poster text default null,
  p_backdrop text default null, p_vote numeric default null
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
  return v_id;
end $$;

revoke execute on function public.asegurar_pelicula from public, anon;
grant execute on function public.asegurar_pelicula to authenticated;
