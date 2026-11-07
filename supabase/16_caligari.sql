-- El título de México de Caligari trae el año pegado.
update public.peliculas set titulo = 'El gabinete del Dr. Caligari' where tmdb_id = 234 and media_type = 'movie';
select titulo from public.peliculas where tmdb_id = 234;
