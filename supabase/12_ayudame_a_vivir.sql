-- Ayúdame a vivir (José A. Ferreyra, 1936), con Libertad Lamarque: está gratis en Cine.ar.

insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,
  sinopsis, poster_path, backdrop_path, vote_average)
values (429445, 'movie', 'Ayúdame a vivir', 'Ayúdame a vivir', 'Ayúdame a vivir', 1936, 'José A. Ferreyra', 'En la década de 1930, la joven Luisita debe irse lejos de su amado Julio tras contraer tuberculosis. Ya curada, cuando regresa descubre que algo en él ha cambiado y se ve implicada en un crimen. Canciones y diálogos arman la trama.', '/wfphWuWtbZOgxmkAElEzaEWLifE.jpg', '/59dZ2tM7WCmaTHvev5M0AA820bm.jpg', 5.9)
on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;
