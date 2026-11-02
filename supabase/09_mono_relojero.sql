-- El mono relojero (Quirino Cristiani, 1938): la única película de Cristiani que se conserva.
-- No es de dominio público: se ve con un link afuera de la página (copia de terceros en Internet Archive).

insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,
  sinopsis, poster_path, backdrop_path, vote_average)
values (253766, 'movie', 'El mono relojero', 'El Mono Relojero', 'El Mono Relojero', 1938, 'Quirino Cristiani', 'Adaptación de Eleazar P. Maestre sobre el cuento El mono relojero de Vigil . Fue la primera película animada de Argentina con sonido óptico.', '/257Fn6FOUJJ4z7eLoRWMQb3yGUZ.jpg', '/1tsDYGWWlHfITRaOoXI9pHYEHCN.jpg', 5.4)
on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;
