// TMDB a través de la Netlify Function (la clave nunca llega al navegador).
const FN = "/.netlify/functions/tmdb";

export const IMG = "https://image.tmdb.org/t/p/";

async function tmdb(path, params = {}) {
  const qs = new URLSearchParams({ path, language: "es-AR", ...params });
  const res = await fetch(`${FN}?${qs}`);
  if (!res.ok) throw new Error(`TMDB respondió ${res.status}`);
  return res.json();
}

export async function buscar(query, tipo = "multi") {
  const data = await tmdb(`/search/${tipo}`, { query, include_adult: "false" });
  return (data.results || [])
    .filter(r => r.media_type !== "person")
    .map(r => ({ ...r, media_type: r.media_type || (tipo === "tv" ? "tv" : "movie") }))
    .slice(0, 10);
}

export function detalles(id, mediaType) {
  return tmdb(`/${mediaType}/${id}`, {
    append_to_response: "credits,videos",
    include_video_language: "es,en,null",
  });
}

export async function trailerDe(id, mediaType) {
  const data = await tmdb(`/${mediaType}/${id}/videos`, { include_video_language: "es,en,null" });
  return elegirTrailer(data.results);
}

// Prefiere tráiler oficial en castellano; si no hay, cualquier tráiler o teaser de YouTube.
export function elegirTrailer(videos = []) {
  const yt = videos.filter(v => v.site === "YouTube");
  if (!yt.length) return null;
  const puntaje = v =>
    (v.type === "Trailer") * 8 + (v.iso_639_1 === "es") * 4 + (v.official ? 2 : 0) + (v.type === "Teaser");
  return yt.reduce((a, b) => (puntaje(b) > puntaje(a) ? b : a)).key;
}

export function anioDe(r) {
  const f = r.release_date || r.first_air_date || "";
  return f ? Number(f.slice(0, 4)) : null;
}

export function direccionDe(d, mediaType) {
  const nombres = mediaType === "tv"
    ? (d.created_by || []).map(p => p.name)
    : (d.credits?.crew || []).filter(p => p.job === "Director").map(p => p.name);
  return nombres.slice(0, 3).join(", ") || null;
}
