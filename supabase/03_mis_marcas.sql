-- Correr DESPUÉS de haber entrado a la web una vez con hjavih@gmail.com.
-- Te hace admin (podés confirmar los "¿Es esta?") y carga tus vistas, puntajes y tu lista.
do $$
declare v_user uuid := (select id from auth.users where email = 'hjavih@gmail.com');
begin
  if v_user is null then raise exception 'Primero entrá a la web con hjavih@gmail.com'; end if;
  insert into public.admins (user_id) values (v_user) on conflict do nothing;

  insert into public.marcas (user_id, pelicula_id, visto, puntaje, en_mi_lista, visto_at)
  select v_user, p.id, m.visto, m.puntaje, m.en_mi_lista, case when m.visto then now() end
  from (values
    ('Uno de los nuestros', 790::smallint, true, 5::smallint, false),
    ('Cadena perpetua', 840::smallint, true, 5::smallint, false),
    ('Los puentes de Madison', null::smallint, false, 0::smallint, true),
    ('Papelito', null::smallint, true, 5::smallint, true),
    ('Proyecto Brainstorm', null::smallint, false, 0::smallint, true),
    ('Bonanza (En vías de extinción)', null::smallint, false, 0::smallint, true),
    ('Perdidos', null::smallint, true, 4::smallint, true),
    ('La salvaje y azul lejanía', null::smallint, false, 0::smallint, true),
    ('La fuente de la vida', null::smallint, false, 0::smallint, true),
    ('Nirvana the Band the Show', null::smallint, false, 0::smallint, true),
    ('Breaking Bad', null::smallint, true, 4::smallint, true),
    ('Achupallas', null::smallint, true, 5::smallint, true),
    ('Peaky Blinders', null::smallint, true, 4::smallint, true),
    ('La forma del agua', null::smallint, false, 0::smallint, true),
    ('The Inventor: Out for Blood in Silicon Valley', null::smallint, false, 0::smallint, true),
    ('Ted Lasso', null::smallint, false, 0::smallint, true),
    ('CODA: Los sonidos del silencio', null::smallint, false, 0::smallint, true),
    ('El canto del cisne', null::smallint, false, 0::smallint, true),
    ('Finch', null::smallint, false, 0::smallint, true),
    ('Nomadland', null::smallint, false, 0::smallint, true),
    ('Avatar: El sentido del agua', null::smallint, false, 0::smallint, true),
    ('Pachinko', null::smallint, false, 0::smallint, true),
    ('Separación', null::smallint, false, 0::smallint, true),
    ('The Dropout', null::smallint, false, 0::smallint, true),
    ('Los asesinos de la luna', null::smallint, false, 0::smallint, true),
    ('Silo', null::smallint, false, 0::smallint, true),
    ('Terapia sin filtro', null::smallint, false, 0::smallint, true),
    ('Dune: Parte dos', null::smallint, false, 0::smallint, true),
    ('No Other Land', null::smallint, false, 0::smallint, true),
    ('Algo viejo, algo nuevo, algo prestado', null::smallint, true, 4::smallint, true),
    ('Del cielo al infierno', null::smallint, false, 0::smallint, true),
    ('El abismo secreto', null::smallint, false, 0::smallint, true),
    ('Los pecadores', null::smallint, false, 0::smallint, true),
    ('Pluribus', null::smallint, false, 0::smallint, true),
    ('Señor Jazz, la película de Carlos Inzillo', null::smallint, true, 5::smallint, true),
    ('Nuestra tierra', null::smallint, false, 0::smallint, true),
    ('Peaky Blinders: El hombre inmortal', null::smallint, false, 0::smallint, true),
    ('You Can See Everything', null::smallint, false, 0::smallint, true)
  ) as m(titulo, pagina, visto, puntaje, en_mi_lista)
  join public.peliculas p on p.titulo = m.titulo and p.pagina_libro is not distinct from m.pagina
  on conflict (user_id, pelicula_id) do update
    set visto = excluded.visto, puntaje = excluded.puntaje, en_mi_lista = excluded.en_mi_lista;
end $$;
