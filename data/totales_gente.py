import sys, re, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tm import tm
p = r"C:/Users/Javi/Desktop/Apps/Watchlist/cinetracker/src/data/gente.js"
s = open(p, encoding="utf-8").read()
JOB = {"Dirección": "Director", "Fotografía": "Director of Photography", "Montaje": "Editor"}
# créditos que suma cinenacional (creditosExtra.js): contar también esos
ce = open(r"C:/Users/Javi/Desktop/Apps/Watchlist/cinetracker/src/data/creditosExtra.js", encoding="utf-8").read()
extra = {}
for clave, cuerpo in re.findall(r'"movie-(\d+)": \{([^\n]*)\}', ce):
    for k, job in (("foto", "Director of Photography"), ("mont", "Editor"), ("dir", "Director")):
        m = re.search(k + r": \[(.*?)\]\]", cuerpo)
        if m:
            for pid in re.findall(r"\[(\d+),", m.group(1) + "]"):
                extra.setdefault((int(pid), job), set()).add(("movie", int(clave)))
bloques = re.split(r'(\{ rol: "[^"]+")', s)
rol = None
out = []
for b in bloques:
    m = re.match(r'\{ rol: "([^"]+)"', b)
    if m:
        rol = m.group(1)
        out.append(b); continue
    def rep(mm):
        pid = int(mm.group(1)); job = JOB[rol]
        c = tm(f"/person/{pid}/combined_credits")
        pel = {(x["media_type"], x["id"]) for x in c["crew"] if x["job"] == job} | extra.get((pid, job), set())
        print(rol, pid, len(pel))
        linea = re.sub(r", total: \d+", "", mm.group(0))
        return linea.replace(" n: ", f" total: {len(pel)}, n: ", 1)
    out.append(re.sub(r'\{ id: (\d+), nombre: [^\n]*\}', rep, b) if rol else b)
open(p, "w", encoding="utf-8").write("".join(out))
