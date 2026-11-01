-- Páginas públicas: el catálogo se puede ver sin iniciar sesión (para compartir links).
-- Las marcas (qué vio cada uno) siguen siendo privadas. A los visitantes no se les
-- muestra quién sumó cada película ni las opciones del "¿Es esta?".

create policy "catalogo publico" on public.peliculas
  for select to anon using (true);

-- Supabase le da a anon permiso sobre toda la tabla: se saca y se dan solo estas columnas.
revoke select on public.peliculas from anon;
grant select (id, tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,
              sinopsis, poster_path, backdrop_path, vote_average, trailer_youtube, listas,
              pagina_libro, donde_ver, cruce)
  on public.peliculas to anon;
