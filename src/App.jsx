import { useState, useEffect, useRef } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const STORAGE_KEY = "cinetracker_list_v2";

function loadList() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function saveList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

async function searchTMDB(query) {
  const url = `${TMDB_BASE}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-AR&include_adult=false`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).filter(r => r.media_type !== "person" && (r.poster_path || r.backdrop_path)).slice(0, 8);
}

function StarRating({ value, onChange, size = 18, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;

  return (
    <div
      style={{ display: "flex", gap: "2px", alignItems: "center" }}
      onMouseLeave={() => !readonly && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= display;
        return (
          <svg
            key={star}
            width={size} height={size} viewBox="0 0 24 24"
            onMouseEnter={() => !readonly && setHovered(star)}
            onClick={() => {
              if (readonly) return;
              onChange(value === star ? 0 : star);
            }}
            style={{
              cursor: readonly ? "default" : "pointer",
              transition: "transform 0.15s ease, filter 0.15s ease",
              transform: !readonly && hovered === star ? "scale(1.35)" : "scale(1)",
              filter: filled ? "drop-shadow(0 0 5px rgba(245,197,24,0.9))" : "none",
              flexShrink: 0,
            }}
          >
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? "#f5c518" : "none"}
              stroke={filled ? "#f5c518" : "#3a3a3a"}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
      {value > 0 && (
        <span style={{
          color: "#f5c518", fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size * 0.75, letterSpacing: "0.5px", marginLeft: "3px"
        }}>
          {value}/5
        </span>
      )}
    </div>
  );
}

function MediaCard({ item, onToggle, onRemove, onRate }) {
  const [hover, setHover] = useState(false);
  const [justWatched, setJustWatched] = useState(false);
  const watched = item.watched;
  const type = item.media_type === "tv" ? "Serie" : "Película";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const title = item.title || item.name;

  function handleToggle() {
    const willBeWatched = !watched;
    onToggle(item.id);
    if (willBeWatched && !item.rating) {
      setJustWatched(true);
      setTimeout(() => setJustWatched(false), 2800);
    }
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: "3px",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hover ? "translateY(-7px) scale(1.02)" : "none",
        boxShadow: hover
          ? item.rating
            ? "0 18px 44px rgba(245,197,24,0.22)"
            : watched
              ? "0 18px 44px rgba(60,200,60,0.22)"
              : "0 18px 44px rgba(200,40,40,0.32)"
          : "0 4px 14px rgba(0,0,0,0.7)",
        background: "#111",
        aspectRatio: "2/3",
      }}
    >
      {/* Poster */}
      {item.poster_path ? (
        <img
          src={`${IMG_BASE}${item.poster_path}`}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
        />
      ) : (
        <div style={{
          position: "absolute", inset: 0, background: "#161616",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "14px", textAlign: "center"
        }}>
          <span style={{ color: "#444", fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", letterSpacing: "0.5px" }}>{title}</span>
        </div>
      )}

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: watched
          ? item.rating
            ? "linear-gradient(180deg, rgba(0,0,0,0.05) 25%, rgba(20,12,0,0.96) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,35,0,0.96) 100%)"
          : "linear-gradient(180deg, rgba(0,0,0,0.0) 35%, rgba(70,0,0,0.95) 100%)",
        transition: "background 0.4s ease",
      }} />

      {/* Tipo */}
      <div style={{
        position: "absolute", top: 7, left: 7, zIndex: 3,
        background: item.media_type === "tv" ? "#1a5c8a" : "#7a0000",
        color: "#ccc", fontSize: "8px", fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "1.2px", padding: "2px 6px", borderRadius: "2px"
      }}>{type}</div>

      {/* Status */}
      <div style={{
        position: "absolute", top: 7, right: 7, zIndex: 3,
        background: watched ? "rgba(0,120,0,0.92)" : "rgba(160,0,0,0.92)",
        color: "#fff", fontSize: "8px", fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "1px", padding: "2px 7px", borderRadius: "2px",
        border: `1px solid ${watched ? "#00cc00" : "#cc0000"}`,
        textShadow: `0 0 6px ${watched ? "#00ff00" : "#ff0000"}`
      }}>{watched ? "✓ VISTA" : "POR VER"}</div>

      {/* Hint "calificá" */}
      {justWatched && (
        <div style={{
          position: "absolute", top: "38%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0.88)",
          border: "1px solid #f5c518",
          borderRadius: "4px", padding: "8px 14px",
          zIndex: 10, textAlign: "center",
          animation: "popIn 0.25s ease",
          whiteSpace: "nowrap",
        }}>
          <div style={{ fontSize: "16px", marginBottom: "3px" }}>⭐</div>
          <div style={{ color: "#f5c518", fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "1.5px" }}>
            ¿QUÉ TE PARECIÓ?
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "10px 9px 9px", zIndex: 2,
      }}>
        <div style={{
          color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(11px, 1.5vw, 14px)", lineHeight: 1.2,
          letterSpacing: "0.5px", marginBottom: "2px",
          textShadow: "0 1px 6px rgba(0,0,0,1)"
        }}>{title}</div>

        <div style={{ color: "#777", fontSize: "10px", fontFamily: "Georgia, serif", marginBottom: "5px" }}>
          {year}{item.vote_average ? ` · ★ ${item.vote_average.toFixed(1)}` : ""}
        </div>

        {/* Estrellas — solo cuando está vista */}
        {watched && (
          <div style={{ marginBottom: "7px" }}>
            <StarRating value={item.rating || 0} onChange={(v) => onRate(item.id, v)} size={14} />
            {!item.rating && (
              <div style={{
                color: "#444", fontSize: "9px", fontFamily: "Georgia, serif",
                fontStyle: "italic", marginTop: "2px", letterSpacing: "0.3px"
              }}>tu calificación</div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={handleToggle}
            style={{
              flex: 1, padding: "5px 3px", fontSize: "9px",
              fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.8px",
              background: watched ? "rgba(0,110,0,0.85)" : "rgba(140,0,0,0.85)",
              color: "#eee", border: `1px solid ${watched ? "#009900" : "#990000"}`,
              borderRadius: "2px", cursor: "pointer", transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {watched ? "✓ VISTA" : "MARCAR VISTA"}
          </button>
          <button
            onClick={() => onRemove(item.id)}
            style={{
              padding: "5px 8px", fontSize: "11px",
              background: "rgba(20,20,20,0.9)", color: "#444",
              border: "1px solid #222", borderRadius: "2px", cursor: "pointer",
            }}
          >✕</button>
        </div>
      </div>
    </div>
  );
}

function SearchDropdown({ results, onSelect, loading }) {
  if (!results.length && !loading) return null;
  return (
    <div style={{
      position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
      background: "#0c0c0c", border: "1px solid #252525", borderTop: "none",
      maxHeight: "370px", overflowY: "auto", borderRadius: "0 0 4px 4px",
    }}>
      {loading && (
        <div style={{ padding: "16px", color: "#383838", fontFamily: "Georgia, serif", fontSize: "12px", textAlign: "center" }}>
          Buscando...
        </div>
      )}
      {results.map(r => {
        const title = r.title || r.name;
        const year = (r.release_date || r.first_air_date || "").slice(0, 4);
        const type = r.media_type === "tv" ? "Serie" : "Película";
        return (
          <div
            key={r.id}
            onClick={() => onSelect(r)}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "9px 14px", cursor: "pointer",
              borderBottom: "1px solid #161616", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#141414"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {r.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w92${r.poster_path}`} alt={title}
                style={{ width: "30px", height: "45px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }} />
            ) : (
              <div style={{ width: "30px", height: "45px", background: "#1a1a1a", borderRadius: "2px", flexShrink: 0 }} />
            )}
            <div>
              <div style={{ color: "#ccc", fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", letterSpacing: "0.5px" }}>{title}</div>
              <div style={{ color: "#3a3a3a", fontSize: "11px", fontFamily: "Georgia, serif" }}>
                {type}{year ? ` · ${year}` : ""}{r.vote_average ? ` · ★ ${r.vote_average.toFixed(1)}` : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
      <span style={{ color, fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px" }}>{value}</span>
      <span style={{ color: "#2e2e2e", fontFamily: "Georgia, serif", fontSize: "9px", letterSpacing: "1px" }}>{label}</span>
    </div>
  );
}

export default function App() {
  const [list, setList] = useState(loadList);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => saveList(list), 0);
    return () => clearTimeout(timeout);
  }, [list]);

  
useEffect(() => {
  if (!query.trim()) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimeout(() => setResults([]), 0);
    return;
  }
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => {
    setLoading(true);
    searchTMDB(query)
      .then(res => setResults(res))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, 400);
}, [query]); 

  useEffect(() => {
    function handle(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false); setResults([]);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function addItem(item) {
    if (list.find(i => i.id === item.id)) return;
    setList(prev => [{ ...item, watched: false, rating: 0, addedAt: Date.now() }, ...prev]);
    setQuery(""); setResults([]);
  }
  function toggleWatched(id) {
    setList(prev => prev.map(i => i.id === id ? { ...i, watched: !i.watched } : i));
  }
  function rateItem(id, rating) {
    setList(prev => prev.map(i => i.id === id ? { ...i, rating, watched: rating > 0 ? true : i.watched } : i));
  }
  function removeItem(id) {
    setList(prev => prev.filter(i => i.id !== id));
  }

  const FILTERS = [
    { id: "all", label: "TODO" },
    { id: "pending", label: "POR VER" },
    { id: "watched", label: "VISTAS" },
    { id: "rated", label: "CALIFICADAS" },
    { id: "movies", label: "PELÍCULAS" },
    { id: "series", label: "SERIES" },
  ];

  const filtered = list.filter(i => {
    if (filter === "pending") return !i.watched;
    if (filter === "watched") return i.watched;
    if (filter === "rated") return i.rating > 0;
    if (filter === "movies") return i.media_type !== "tv";
    if (filter === "series") return i.media_type === "tv";
    return true;
  });

  const pendingCount = list.filter(i => !i.watched).length;
  const watchedCount = list.filter(i => i.watched).length;
  const ratedItems = list.filter(i => i.rating > 0);
  const avgRating = ratedItems.length > 0
    ? (ratedItems.reduce((s, i) => s + i.rating, 0) / ratedItems.length).toFixed(1)
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; color: #e0e0e0; min-height: 100vh; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0c0c0c; }
        ::-webkit-scrollbar-thumb { background: #252525; border-radius: 3px; }
        input:focus { outline: none; }
        @keyframes popIn {
          from { opacity: 0; transform: translate(-50%, -42%) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)",
        borderBottom: "1px solid #161616",
        padding: "0 24px",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "14px 0 0",
          display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap"
        }}>
          <div style={{ minWidth: "170px" }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px",
              letterSpacing: "4px", color: "#fff",
              textShadow: "0 0 24px rgba(180,0,0,0.5)"
            }}>🎬 CINETRACKER</div>
            <div style={{ display: "flex", gap: "14px", marginTop: "4px", flexWrap: "wrap" }}>
              <Stat label="POR VER" value={pendingCount} color="#bb2200" />
              <Stat label="VISTAS" value={watchedCount} color="#008800" />
              {avgRating && <Stat label="PROMEDIO" value={`★ ${avgRating}`} color="#f5c518" />}
            </div>
          </div>

          <div ref={searchRef} style={{ flex: 1, maxWidth: "500px", position: "relative" }}>
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              placeholder="Buscar película o serie..."
              style={{
                width: "100%", padding: "10px 16px",
                background: "#0e0e0e", border: "1px solid #222",
                borderRadius: "3px", color: "#ccc",
                fontFamily: "Georgia, serif", fontSize: "13px",
              }}
            />
            {showSearch && <SearchDropdown results={results} onSelect={addItem} loading={loading} />}
          </div>
        </div>

        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "10px 0", display: "flex", gap: "4px", flexWrap: "wrap"
        }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "4px 13px", fontSize: "10px",
                fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1.5px",
                background: filter === f.id ? "#a00" : "transparent",
                color: filter === f.id ? "#fff" : "#3c3c3c",
                border: filter === f.id ? "1px solid #cc0000" : "1px solid #1c1c1c",
                borderRadius: "2px", cursor: "pointer", transition: "all 0.2s",
              }}
            >{f.label}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "100px 20px",
            color: "#1e1e1e", fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "20px", letterSpacing: "3px", lineHeight: 2
          }}>
            {list.length === 0
              ? <>BUSCÁ UNA PELÍCULA O SERIE<br />PARA EMPEZAR TU LISTA</>
              : "NO HAY TÍTULOS EN ESTA CATEGORÍA"}
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "14px",
          }}>
            {filtered.map(item => (
              <MediaCard
                key={item.id}
                item={item}
                onToggle={toggleWatched}
                onRemove={removeItem}
                onRate={rateItem}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
