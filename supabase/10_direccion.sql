-- Director para las películas que entraron al catálogo desde una ficha, la búsqueda o "Mi lista"
-- (las funciones no lo guardaban). Desde ahora lo reciben como p_direccion.

update public.peliculas set direccion = 'Carlos Galettini' where id = 1118 and direccion is null;
update public.peliculas set direccion = 'Alejandra Martín, Paola Rizzi' where id = 1120 and direccion is null;
update public.peliculas set direccion = 'Mariano Varela, Ariel Winograd' where id = 1121 and direccion is null;
update public.peliculas set direccion = 'Juan José Jusid' where id = 1122 and direccion is null;
update public.peliculas set direccion = 'Lucrecia Martel' where id = 1119 and direccion is null;
update public.peliculas set direccion = 'Theodore Melfi' where id = 1231 and direccion is null;

drop function public.asegurar_pelicula(integer, text, text, text, smallint, text, text, text, numeric);
create function public.asegurar_pelicula(
  p_tmdb_id integer, p_media_type text, p_titulo text,
  p_titulo_original text default null, p_anio smallint default null,
  p_sinopsis text default null, p_poster text default null,
  p_backdrop text default null, p_vote numeric default null,
  p_direccion text default null
) returns bigint
language plpgsql security definer set search_path = public as $$
declare v_id bigint;
begin
  if auth.uid() is null then raise exception 'Hace falta iniciar sesión'; end if;
  if p_media_type not in ('movie','tv') then raise exception 'media_type inválido'; end if;

  insert into peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio,
                         sinopsis, poster_path, backdrop_path, vote_average, direccion)
  values (p_tmdb_id, p_media_type, p_titulo, p_titulo, p_titulo_original, p_anio,
          p_sinopsis, p_poster, p_backdrop, p_vote, left(p_direccion, 200))
  on conflict (tmdb_id, media_type) where tmdb_id is not null
    do update set direccion = coalesce(peliculas.direccion, excluded.direccion);

  select id into v_id from peliculas where tmdb_id = p_tmdb_id and media_type = p_media_type;
  return v_id;
end $$;

revoke execute on function public.asegurar_pelicula from public, anon;
grant execute on function public.asegurar_pelicula to authenticated;

drop function public.agregar_a_mi_lista(integer, text, text, text, smallint, text, text, text, numeric, boolean, smallint);
create function public.agregar_a_mi_lista(
  p_tmdb_id integer, p_media_type text, p_titulo text,
  p_titulo_original text default null, p_anio smallint default null,
  p_sinopsis text default null, p_poster text default null,
  p_backdrop text default null, p_vote numeric default null,
  p_visto boolean default false, p_puntaje smallint default 0,
  p_direccion text default null
) returns bigint
language plpgsql security definer set search_path = public as $$
declare v_id bigint;
begin
  if auth.uid() is null then raise exception 'Hace falta iniciar sesión'; end if;
  if p_media_type not in ('movie','tv') then raise exception 'media_type inválido'; end if;

  insert into peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio,
                         sinopsis, poster_path, backdrop_path, vote_average, direccion)
  values (p_tmdb_id, p_media_type, p_titulo, p_titulo, p_titulo_original, p_anio,
          p_sinopsis, p_poster, p_backdrop, p_vote, left(p_direccion, 200))
  on conflict (tmdb_id, media_type) where tmdb_id is not null
    do update set direccion = coalesce(peliculas.direccion, excluded.direccion);

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
