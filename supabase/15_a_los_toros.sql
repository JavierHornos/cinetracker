-- A los toros...! (Glücksmann, 1927): copia del Museo del Cine; TMDB no la tiene (src/data/agn.js).
insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion, sinopsis, listas, cruce) values
(-10016, 'movie', 'A los toros...!', 'A los toros...!', 'A los toros...!', 1927, 'Max Glücksmann', 'Producción de la Cinematografía Argentina Max Glücksmann, de 1927. Copia del Museo del Cine (ciclo Nitrato argentino).', '{}'::text[], 'segura')
on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;
select tmdb_id, titulo, anio from public.peliculas where tmdb_id = -10016;
