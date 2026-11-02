-- Perdón viejita (José A. Ferreyra, 1927): una de las pocas películas mudas de Ferreyra que se conservan.
-- Se ve completa en el capítulo 1 (copia en Internet Archive).

insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,
  sinopsis, poster_path, backdrop_path, vote_average)
values (234260, 'movie', 'Perdón viejita', 'Perdón, viejita', 'Perdón, viejita', 1927, 'José A. Ferreyra', null, '/dYl3MSF8vwd3pu3eMSKWHV4CmUC.jpg', null, 8.5)
on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;
