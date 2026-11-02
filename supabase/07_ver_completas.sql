-- Películas mudas que se pueden ver completas en la página (copias de dominio público o CC BY
-- en Wikimedia Commons) y que no estaban en el catálogo. Sin lista: aparecen en el capítulo 1.

insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,
  sinopsis, poster_path, backdrop_path, vote_average)
values
  (160, 'movie', 'La llegada del tren', 'Llegada de un tren a la estación de la Ciotat', 'L''arrivée d''un train à La Ciotat', 1896, 'Louis Lumière, Auguste Lumière', '"L''Arrivée d''un train à La Ciotat" es sin duda uno de los filmes más famosos de la historia. La imagen de un tren llegando a una estación, pasando muy cerca de la cámara mientras reduce la velocidad, se convirtió rápidamente en una escena absolutamente icónica de esa curiosidad de reciente invención llamada "cinematógrafo".', '/y3A15HpugKsPjVyxKa9POLTEX6B.jpg', '/kLDi7ST92diaAzISLgd94BYO6Zw.jpg', 7.1),
  (233020, 'movie', 'La Revolución de Mayo', 'La revolución de Mayo', 'La revolución de Mayo', 1909, 'Mario Gallo', null, '/eUYZtcXxdxh47PuhR2opYmbYX9V.jpg', '/foawXVEqFCnspUZD1ZOblkhZZdr.jpg', 5.1),
  (226934, 'movie', 'Amalia', 'Amalia', 'Amalia', 1914, 'Enrique García Velloso', null, '/TCZYjKl4HHFSkEKqAfLgjiGwMB.jpg', null, 5.5)
on conflict (tmdb_id, media_type) where tmdb_id is not null do nothing;
