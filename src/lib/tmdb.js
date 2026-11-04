import { CREDITOS_EXTRA, JOB_EXTRA } from "../data/creditosExtra";

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
    append_to_response: "credits,videos,watch/providers",
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

// Ficha de una persona con toda su filmografía. Si no hay biografía en castellano, trae la inglesa (y lo marca).
export async function persona(id) {
  const d = await tmdb(`/person/${id}`, { append_to_response: "combined_credits" });
  if (!d.biography) {
    const en = await tmdb(`/person/${id}`, { language: "en-US" }).catch(() => null);
    if (en?.biography) { d.biography = en.biography; d.biografia_en_ingles = true; }
  }
  return d;
}

// Solo los datos de la persona, sin filmografía: para la vista previa al pasar el mouse por un nombre.
export async function personaBreve(id) {
  const d = await tmdb(`/person/${id}`);
  if (!d.biography) {
    const en = await tmdb(`/person/${id}`, { language: "en-US" }).catch(() => null);
    if (en?.biography) d.biography = en.biography;
  }
  return d;
}

// Los roles que importan para leer una película: quién la dirigió, la fotografió y la montó.
export const ROLES = [
  { job: "Director", titulo: "DIRECCIÓN", plural: "COMO DIRECTOR" },
  { job: "Director of Photography", titulo: "FOTOGRAFÍA", plural: "COMO DIRECTOR DE FOTOGRAFÍA" },
  { job: "Editor", titulo: "MONTAJE", plural: "COMO MONTAJISTA" },
];

export function equipoDe(d, mediaType) {
  const crew = d?.credits?.crew || [];
  // Lo que TMDB no tiene y sí figura en cinenacional.com (src/data/creditosExtra.js).
  const extra = CREDITOS_EXTRA[`${mediaType}-${d?.id}`] || {};
  return ROLES.map(r => {
    let gente = crew.filter(p => p.job === r.job);
    if (r.job === "Director" && mediaType === "tv") gente = gente.concat(d.created_by || []);
    const clave = Object.keys(JOB_EXTRA).find(k => JOB_EXTRA[k] === r.job);
    const nombres = new Set(gente.map(p => p.name.toLowerCase()));
    for (const [id, name] of extra[clave] || []) {
      if (!gente.some(p => p.id === id) && !nombres.has(name.toLowerCase())) {
        gente.push({ id, name, profile_path: null, de_cinenacional: true });
      }
    }
    const unicos = [...new Map(gente.map(p => [p.id ?? p.name, p])).values()].slice(0, 4);
    return { ...r, gente: unicos };
  }).filter(r => r.gente.length);
}

// Dónde verla en Argentina (datos de JustWatch vía TMDB), agrupado de lo más accesible a lo más caro.
const TIPOS_DONDE = [
  { clave: ["free", "ads"], titulo: "Gratis" },
  { clave: ["flatrate"], titulo: "Con suscripción" },
  { clave: ["rent"], titulo: "Alquiler" },
  { clave: ["buy"], titulo: "Compra" },
];

export function dondeVerDe(d) {
  const ar = d?.["watch/providers"]?.results?.AR;
  if (!ar) return { link: null, grupos: [] };
  const vistas = new Set();
  const grupos = TIPOS_DONDE.map(t => {
    const lista = t.clave.flatMap(k => ar[k] || [])
      .sort((a, b) => a.display_priority - b.display_priority)
      .filter(p => !vistas.has(p.provider_id) && vistas.add(p.provider_id));
    return { titulo: t.titulo, plataformas: lista };
  }).filter(g => g.plataformas.length);
  return { link: ar.link, grupos };
}

// Las habladas en castellano van con su título original: en es-AR, TMDB a veces devuelve
// el título de España (Futbolín en vez de Metegol).
export function tituloDe(r) {
  const original = r.original_title || r.original_name;
  return r.original_language === "es" && original ? original : r.title || r.name;
}
