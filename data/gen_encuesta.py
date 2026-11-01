"""Genera la carga de la Encuesta de cine argentino 2022 a partir de data/encuesta2022_tmdb.json
y data/ranking_nombres.json (los arma data/cruce100.py):

- supabase/06_encuesta2022.sql: suma las 103 al catálogo con la lista 'encuesta2022'.
- src/data/encuesta2022.js: el puesto de cada una (por id de TMDB).
- src/data/gente.js: los que más aparecen en dirección, fotografía y montaje, para la galería.

Uso: python -X utf8 data/gen_encuesta.py  (lee TMDB_API_KEY del .env)
"""
import json, re, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CLAVE = re.search(r"^TMDB_API_KEY=(.*)$", (RAIZ / ".env").read_text(encoding="utf-8"), re.M).group(1).strip()


def tm(path, **p):
    p["api_key"] = CLAVE
    return json.load(urllib.request.urlopen(f"https://api.themoviedb.org/3{path}?{urllib.parse.urlencode(p)}"))


def elegir_trailer(videos):
    yt = [v for v in videos if v["site"] == "YouTube"]
    if not yt:
        return None
    puntaje = lambda v: (v["type"] == "Trailer") * 8 + (v.get("iso_639_1") == "es") * 4 + v.get("official", False) * 2 + (v["type"] == "Teaser")
    return max(yt, key=puntaje)["key"]


def sql(v):
    if v is None:
        return "null"
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


encuesta = json.loads((RAIZ / "data/encuesta2022_tmdb.json").read_text(encoding="utf-8"))
ranking = json.loads((RAIZ / "data/ranking_nombres.json").read_text(encoding="utf-8"))


def detalle(t):
    d = tm(f"/movie/{t['tmdb_id']}", language="es-AR", append_to_response="credits,videos", include_video_language="es,en,null")
    return t, d


with ThreadPoolExecutor(8) as ex:
    filas = list(ex.map(detalle, encuesta))

valores = []
for t, d in filas:
    direccion = ", ".join(c["name"] for c in d["credits"]["crew"] if c["job"] == "Director")[:200] or t["direccion"]
    anio = int((d.get("release_date") or str(t["anio"]))[:4])
    valores.append("(" + ", ".join(sql(x) for x in [
        t["tmdb_id"], "movie", t["titulo"], d.get("title"), d.get("original_title"), anio, direccion,
        d.get("overview") or None, d.get("poster_path"), d.get("backdrop_path"),
        round(d["vote_average"], 1) if d.get("vote_average") else None, elegir_trailer(d["videos"]["results"]),
    ]) + ", '{encuesta2022}')")

(RAIZ / "supabase/06_encuesta2022.sql").write_text(
    "-- Encuesta de cine argentino 2022 (Taipei, La vida útil, La tierra quema): 103 películas por empates.\n"
    "-- Las que ya estaban en el catálogo solo suman la lista 'encuesta2022'. Generado por data/gen_encuesta.py.\n\n"
    "insert into public.peliculas (tmdb_id, media_type, titulo, titulo_tmdb, titulo_original, anio, direccion,\n"
    "  sinopsis, poster_path, backdrop_path, vote_average, trailer_youtube, listas)\nvalues\n  "
    + ",\n  ".join(valores)
    + "\non conflict (tmdb_id, media_type) where tmdb_id is not null do update\n"
    "  set listas = array(select distinct unnest(peliculas.listas || excluded.listas));\n",
    encoding="utf-8")

puestos = ",\n".join(f"  {t['tmdb_id']}: {t['puesto']}," for t in encuesta).rstrip(",")
(RAIZ / "src/data/encuesta2022.js").write_text(
    "// Encuesta de cine argentino 2022: puesto de cada película (clave: id de TMDB).\n"
    "// Los empates comparten puesto. Generado por data/gen_encuesta.py.\n\n"
    "export const ENCUESTA = {\n  titulo: \"Encuesta de cine argentino 2022\",\n"
    "  bajada: \"Las 100 mejores películas argentinas según 546 críticos, cineastas e investigadores, convocados por las revistas Taipei, La vida útil y La tierra quema.\",\n"
    "  fuente: \"https://es.wikipedia.org/wiki/Encuesta_de_cine_argentino\",\n};\n\n"
    "export const PUESTOS = {\n" + "\n".join(f"  {t['tmdb_id']}: {t['puesto']}," for t in encuesta) + "\n};\n",
    encoding="utf-8")

# Galería: los 8 que más aparecen por rol, con su foto.
ROLES = [("direccion", "Dirección"), ("fotografia", "Fotografía"), ("montaje", "Montaje")]
elegidos = {r: ranking["ranking"][r][:8] for r, _ in ROLES}
ids = {x["id"] for lista in elegidos.values() for x in lista}
with ThreadPoolExecutor(8) as ex:
    fotos = dict(ex.map(lambda i: (i, tm(f"/person/{i}").get("profile_path")), ids))

lineas = ["// Quienes más aparecen en dirección, fotografía y montaje de las películas de la encuesta 2022",
          "// y de las 41 de la historia (n = en cuántas). Generado por data/gen_encuesta.py.", "",
          "export const GENTE = ["]
for r, titulo in ROLES:
    lineas.append(f"  {{ rol: {json.dumps(titulo, ensure_ascii=False)}, personas: [")
    for x in elegidos[r]:
        lineas.append(f"    {{ id: {x['id']}, nombre: {json.dumps(x['nombre'], ensure_ascii=False)}, n: {x['n']}, foto: {json.dumps(fotos[x['id']])} }},")
    lineas.append("  ] },")
lineas.append("];")
(RAIZ / "src/data/gente.js").write_text("\n".join(lineas) + "\n", encoding="utf-8")
print("ok:", len(valores), "películas;", {r: len(v) for r, v in elegidos.items()})
