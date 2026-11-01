"""Cruza las 100 de la encuesta 2022 con TMDB y cuenta quién dirigió, fotografió y montó
las películas argentinas del catálogo (las 100 + las 41 de la historia + las argentinas de las 1001)."""
import json, sys, re, unicodedata, urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, ".")
from tm import tm

def norm(s):
    s = unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9 ]", "", s).strip()

top = json.load(open("top100.json", encoding="utf-8"))

# Puesto real: los empatados heredan el puesto del último numerado.
ultimo = None
for t in top:
    if t["puesto"] is None: t["puesto"] = ultimo
    ultimo = t["puesto"]

def buscar(t):
    titulo = t["titulo"].split(",")[0] if t["titulo"].startswith("Este es el romance") else t["titulo"]
    mejores = []
    for q in {titulo, titulo.split("(")[0].strip()}:
        for r in tm("/search/movie", query=q, language="es-AR")["results"]:
            anio = int((r.get("release_date") or "0")[:4] or 0)
            d = abs(anio - t["anio"]) if anio else 9
            score = (d <= 1) * 10 - d + (r.get("original_language") == "es") * 3 + (norm(r.get("original_title")) == norm(titulo)) * 4
            mejores.append((score, r))
    if not mejores: return None, 0
    score, r = max(mejores, key=lambda x: x[0])
    return r, score

with ThreadPoolExecutor(8) as ex:
    res = list(ex.map(buscar, top))
for t, (r, score) in zip(top, res):
    t["tmdb_id"] = r["id"] if r else None
    t["tmdb_titulo"] = r and r.get("title")
    t["tmdb_anio"] = r and (r.get("release_date") or "")[:4]
    t["confianza"] = "segura" if score >= 14 else "revisar"
json.dump(top, open("top100_tmdb.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Catálogo de la página (lectura pública).
env = open(r"C:/Users/Javi/Desktop/Apps/Watchlist/cinetracker/.env", encoding="utf-8").read()
clave = re.search(r"^VITE_SUPABASE_ANON_KEY=(.*)$", env, re.M).group(1).strip()
catalogo = []
for desde in range(0, 3000, 1000):
    req = urllib.request.Request(
        "https://klsptuzmhsiwccaphjud.supabase.co/rest/v1/peliculas?select=id,tmdb_id,media_type,titulo,listas&order=id",
        headers={"apikey": clave, "Range": f"{desde}-{desde + 999}"})
    pag = json.load(urllib.request.urlopen(req))
    catalogo += pag
    if len(pag) < 1000: break

def detalle(mid):
    try:
        return mid, tm(f"/movie/{mid}", append_to_response="credits")
    except Exception:
        return mid, None

ids_1001 = [p["tmdb_id"] for p in catalogo if "1001" in p["listas"] and p["tmdb_id"] and p["media_type"] == "movie"]
ids_41 = {p["tmdb_id"] for p in catalogo if "cine_argentino" in p["listas"] and p["tmdb_id"]}
ids_100 = {t["tmdb_id"] for t in top if t["tmdb_id"]}
todos = set(ids_1001) | ids_41 | ids_100
with ThreadPoolExecutor(12) as ex:
    detalles = dict(ex.map(detalle, todos))

def argentina(d):
    return d and any(c["iso_3166_1"] == "AR" for c in d.get("production_countries", []))
ids_1001_arg = {i for i in ids_1001 if argentina(detalles.get(i))}
universo = ids_100 | ids_41 | ids_1001_arg

JOBS = {"Director": "direccion", "Director of Photography": "fotografia", "Editor": "montaje"}
conteo = {r: Counter() for r in JOBS.values()}
pelis_de = defaultdict(list)
nombres, fotos = {}, {}
for mid in universo:
    d = detalles.get(mid)
    if not d: continue
    vistos = set()
    for c in d["credits"]["crew"]:
        rol = JOBS.get(c["job"])
        if not rol or (rol, c["id"]) in vistos: continue
        vistos.add((rol, c["id"]))
        conteo[rol][c["id"]] += 1
        nombres[c["id"]] = c["name"]
        pelis_de[(rol, c["id"])].append(f'{d.get("title")} ({(d.get("release_date") or "")[:4]})')

resultado = {
    "universo": {"top100": len(ids_100), "historia41": len(ids_41), "1001_argentinas": len(ids_1001_arg), "total": len(universo)},
    "sin_credito": {r: sum(1 for m in universo if detalles.get(m) and not any(JOBS.get(c["job"]) == r for c in detalles[m]["credits"]["crew"])) for r in JOBS.values()},
    "ranking": {r: [{"id": pid, "nombre": nombres[pid], "n": n, "pelis": sorted(pelis_de[(r, pid)])}
                    for pid, n in conteo[r].most_common() if n >= 2] for r in JOBS.values()},
}
json.dump(resultado, open("ranking_nombres.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

print("revisar:", [(t["titulo"], t["anio"], t["tmdb_titulo"], t["tmdb_anio"]) for t in top if t["confianza"] != "segura"])
print("universo:", resultado["universo"], "sin crédito:", resultado["sin_credito"])
for r, lista in resultado["ranking"].items():
    print(f"\n== {r.upper()} ({len(lista)} con 2 o más)")
    for x in lista[:30]:
        print(f'{x["n"]:>2} {x["nombre"]}: ' + "; ".join(x["pelis"][:6]))
