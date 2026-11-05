/* global Netlify */
// Vista previa al pegar un link (WhatsApp, Telegram, Facebook…): esos programas no ejecutan
// JavaScript, así que el afiche, el título y la sinopsis tienen que venir en el HTML.
// Esta función toma index.html y le pone las etiquetas Open Graph de la película, la persona
// o la historia. Después la página carga normal y main.jsx la lleva a la vista que corresponde.

// Datos públicos (los mismos que usa la página en el navegador).
const SUPABASE = "https://klsptuzmhsiwccaphjud.supabase.co";
const CLAVE_PUBLICA = "sb_publishable_zkYPhRzwjhL8uV1VuC_lrQ_yXna3koS";
const IMG = "https://image.tmdb.org/t/p/";
const SITIO = "Cine Club El Doctor";
const POR_DEFECTO = {
  titulo: "Cine Club El Doctor",
  descripcion: "Las 1001 películas del libro, un recorrido por la historia del cine argentino y las fichas de quienes hacen las películas.",
};
const ROLES = { Directing: "Dirección", Camera: "Dirección de fotografía", Editing: "Montaje", Acting: "Actuación" };
// Fichas con texto propio (como en src/data/personas.js), por id de TMDB.
const FICHAS = {
  414697: {
    titulo: "Félix “Chango” Monti · Director de fotografía",
    descripcion: "La luz de dos películas argentinas ganadoras del Oscar. Su historia, contada en el documental Chango, la luz descubre, y todas sus películas.",
  },
};

async function supabase(consulta) {
  const res = await fetch(`${SUPABASE}/rest/v1/${consulta}`, { headers: { apikey: CLAVE_PUBLICA } });
  if (!res.ok) return null;
  return (await res.json())[0] || null;
}

function cortar(texto, max = 200) {
  if (!texto) return "";
  const t = texto.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : t;
}

async function datosDe(ruta) {
  const peli = ruta.match(/^\/p\/(\d+)\/?$/);
  if (peli) {
    const p = await supabase(`peliculas?id=eq.${peli[1]}&select=titulo,anio,direccion,sinopsis,poster_path,backdrop_path`);
    if (!p) return null;
    return {
      titulo: `${p.titulo}${p.anio ? ` (${p.anio})` : ""}`,
      descripcion: cortar([p.direccion && `De ${p.direccion}.`, p.sinopsis].filter(Boolean).join(" ")),
      imagen: p.backdrop_path ? `${IMG}w780${p.backdrop_path}` : p.poster_path && `${IMG}w500${p.poster_path}`,
    };
  }

  const persona = ruta.match(/^\/persona\/(\d+)\/?$/);
  if (persona) {
    const clave = Netlify.env.get("TMDB_API_KEY") || Netlify.env.get("VITE_TMDB_API_KEY");
    const res = await fetch(`https://api.themoviedb.org/3/person/${persona[1]}?api_key=${clave}&language=es-MX`);
    if (!res.ok) return null;
    const d = await res.json();
    const rol = ROLES[d.known_for_department] || "Cine";
    return {
      titulo: `${d.name} · ${rol}`,
      descripcion: cortar(d.biography) || `Ficha y filmografía completa de ${d.name}: marcá las películas que viste.`,
      imagen: d.profile_path && `${IMG}h632${d.profile_path}`,
      ...FICHAS[persona[1]],
    };
  }

  if (/^\/historia\/?$/.test(ruta)) {
    // La historia oficial (1985) como imagen de la historia del cine argentino.
    const p = await supabase("peliculas?tmdb_id=eq.29263&media_type=eq.movie&select=backdrop_path");
    return {
      titulo: "Historia del cine argentino",
      descripcion: "Del cine mudo a hoy en nueve capítulos: directores, actores y las 41 películas para aprender cine argentino.",
      imagen: p?.backdrop_path && `${IMG}w780${p.backdrop_path}`,
    };
  }
  return null;
}

const escapar = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req) {
  const url = new URL(req.url);
  const base = await fetch(new URL("/index.html", url), { cache: "no-store" });
  let html = await base.text();

  let datos = null;
  try { datos = await datosDe(url.pathname); } catch { /* si falla, va la vista previa general */ }
  datos = { ...POR_DEFECTO, ...(datos || {}) };

  const etiquetas = [
    `<meta name="description" content="${escapar(datos.descripcion)}" />`,
    `<meta property="og:site_name" content="${SITIO}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:url" content="${escapar(url.href)}" />`,
    `<meta property="og:title" content="${escapar(datos.titulo)}" />`,
    `<meta property="og:description" content="${escapar(datos.descripcion)}" />`,
    datos.imagen && `<meta property="og:image" content="${escapar(datos.imagen)}" />`,
    `<meta name="twitter:card" content="${datos.imagen ? "summary_large_image" : "summary"}" />`,
  ].filter(Boolean).join("\n    ");

  html = html
    .replace(/\s*<meta (name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g, "")
    .replace(/<title>[^<]*<\/title>/, `<title>${escapar(datos.titulo)} · ${SITIO}</title>`)
    .replace("</head>", `    ${etiquetas}\n  </head>`);

  return new Response(html, {
    // Sin caché: después de cada deploy index.html apunta a archivos nuevos, y una copia vieja dejaría la página en blanco.
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
  });
}

export const config = { path: ["/p/*", "/persona/*", "/historia"] };
