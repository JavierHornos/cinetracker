import { supabase } from "./supabase";
import { anioDe, detalles, direccionDe, elegirTrailer, tituloDe } from "./tmdb";

// Lo que puede leer un visitante sin sesión (ver supabase/05_publico.sql).
const PUBLICAS = "id,tmdb_id,media_type,titulo,titulo_tmdb,titulo_original,anio,direccion,sinopsis," +
  "poster_path,backdrop_path,vote_average,trailer_youtube,listas,pagina_libro,donde_ver,cruce";

// Supabase devuelve como máximo 1000 filas por pedido: el catálogo se trae por páginas.
export async function cargarCatalogo(visitante = false) {
  const PAGINA = 1000;
  let todas = [];
  for (let desde = 0; ; desde += PAGINA) {
    const { data, error } = await supabase
      .from("peliculas").select(visitante ? PUBLICAS : "*").order("id").range(desde, desde + PAGINA - 1);
    if (error) throw error;
    todas = todas.concat(data);
    if (data.length < PAGINA) return todas;
  }
}

export async function cargarPelicula(id) {
  const { data, error } = await supabase.from("peliculas").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function cargarMarcas() {
  const { data, error } = await supabase.from("marcas").select("*");
  if (error) throw error;
  return Object.fromEntries(data.map(m => [m.pelicula_id, m]));
}

export async function esAdmin(userId) {
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return Boolean(data);
}

export async function guardarMarca(userId, marca) {
  const { visto, puntaje, en_mi_lista, visto_at, pelicula_id } = marca;
  const { error } = await supabase.from("marcas").upsert(
    { user_id: userId, pelicula_id, visto, puntaje, en_mi_lista, visto_at },
    { onConflict: "user_id,pelicula_id" },
  );
  if (error) throw error;
}

export async function borrarMarca(peliculaId) {
  const { error } = await supabase.from("marcas").delete().eq("pelicula_id", peliculaId);
  if (error) throw error;
}

// Los resultados de búsqueda y de filmografías no traen el director: se pide aparte.
async function direccionDeTmdb(r) {
  const mediaType = r.media_type === "tv" ? "tv" : "movie";
  const d = await detalles(r.id, mediaType).catch(() => null);
  return d ? direccionDe(d, mediaType) : null;
}

// `r` es un resultado de búsqueda de TMDB.
export async function agregarAMiLista(r, { visto = false, puntaje = 0 } = {}) {
  const { data, error } = await supabase.rpc("agregar_a_mi_lista", {
    p_direccion: await direccionDeTmdb(r),
    p_tmdb_id: r.id,
    p_media_type: r.media_type === "tv" ? "tv" : "movie",
    p_titulo: tituloDe(r),
    p_titulo_original: r.original_title || r.original_name || null,
    p_anio: anioDe(r),
    p_sinopsis: r.overview || null,
    p_poster: r.poster_path || null,
    p_backdrop: r.backdrop_path || null,
    p_vote: r.vote_average ? Math.round(r.vote_average * 10) / 10 : null,
    p_visto: visto,
    p_puntaje: puntaje,
  });
  if (error) throw error;
  return data; // id en el catálogo
}

// Suma una película de TMDB al catálogo sin tocar "Mi lista" (para marcarla desde una ficha).
export async function asegurarPelicula(r) {
  const { data, error } = await supabase.rpc("asegurar_pelicula", {
    p_direccion: await direccionDeTmdb(r),
    p_tmdb_id: r.id,
    p_media_type: r.media_type === "tv" ? "tv" : "movie",
    p_titulo: tituloDe(r),
    p_titulo_original: r.original_title || r.original_name || null,
    p_anio: anioDe(r),
    p_sinopsis: r.overview || null,
    p_poster: r.poster_path || null,
    p_backdrop: r.backdrop_path || null,
    p_vote: r.vote_average ? Math.round(r.vote_average * 10) / 10 : null,
  });
  if (error) throw error;
  return data;
}

// Solo admins: confirma qué película de TMDB es (o que no está en TMDB, con r = null).
export async function corregirPelicula(id, r, mediaType) {
  let cambios = {
    cruce: "segura", candidatos: null, tmdb_id: null, titulo_tmdb: null, titulo_original: null,
    poster_path: null, backdrop_path: null, vote_average: null, trailer_youtube: null,
  };
  if (r) {
    const d = await detalles(r.tmdb_id, mediaType);
    cambios = {
      ...cambios,
      tmdb_id: d.id,
      media_type: mediaType,
      titulo_tmdb: d.title || d.name,
      titulo_original: d.original_title || d.original_name,
      anio: anioDe(d),
      direccion: direccionDe(d, mediaType),
      sinopsis: d.overview || null,
      poster_path: d.poster_path,
      backdrop_path: d.backdrop_path,
      vote_average: d.vote_average ? Math.round(d.vote_average * 10) / 10 : null,
      trailer_youtube: elegirTrailer(d.videos?.results),
    };
  }
  const { data, error } = await supabase.from("peliculas").update(cambios).eq("id", id).select().single();
  if (error) {
    if (error.code === "23505") throw new Error("Esa película ya está en el catálogo con otro título.");
    throw error;
  }
  return data;
}
