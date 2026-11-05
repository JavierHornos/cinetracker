import json, sys, urllib.request, urllib.parse, re
key = re.search(r"^TMDB_API_KEY=(.*)$", open(r"C:/Users/Javi/Desktop/Apps/Watchlist/cinetracker/.env", encoding="utf-8").read(), re.M).group(1).strip()
def tm(path, **p):
    p["api_key"] = key
    return json.load(urllib.request.urlopen(f"https://api.themoviedb.org/3{path}?{urllib.parse.urlencode(p)}"))
