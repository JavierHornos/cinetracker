// Proxy a la API de TMDB: la clave queda en el servidor y no llega al navegador.
// Uso: /.netlify/functions/tmdb?path=/search/multi&query=matrix

const PERMITIDOS = [
  /^\/search\/(multi|movie|tv)$/,
  /^\/(movie|tv)\/\d+$/,
  /^\/(movie|tv)\/\d+\/videos$/,
  /^\/person\/\d+$/,
];

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";
  if (!PERMITIDOS.some(re => re.test(path))) {
    return Response.json({ error: "Ruta no permitida" }, { status: 400 });
  }
  // VITE_TMDB_API_KEY es el nombre que ya tenía la variable en Netlify; el front ya no la usa.
  const key = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;
  if (!key) {
    return Response.json({ error: "Falta TMDB_API_KEY" }, { status: 500 });
  }

  const params = new URLSearchParams(url.searchParams);
  params.delete("path");
  params.set("api_key", key);

  const res = await fetch(`https://api.themoviedb.org/3${path}?${params}`);
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": res.ok ? "public, max-age=3600" : "no-store",
    },
  });
}
