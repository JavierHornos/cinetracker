import { useState, useEffect, useRef } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
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

async function fetchDetails(id, type) {
  const endpoint = type === "tv" ? "tv" : "movie";
  const url = `${TMDB_BASE}/${endpoint}/${id}?api_key=${TMDB_API_KEY}&language=es-AR&append_to_response=credits`;
  const res = await fetch(url);
  return res.json();
}

// ── Estrellas ───────────────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 18, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}
      onMouseLeave={() => !readonly && setHovered(0)}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= display;
        return (
          <svg key={star} width={size} height={size} viewBox="0 0 24 24"
            onMouseEnter={() => !readonly && setHovered(star)}
            onClick={() => { if (readonly) return; onChange(value === star ? 0 : star); }}
            style={{
              cursor: readonly ? "default" : "pointer",
              transition: "transform 0.15s ease, filter 0.15s ease",
              transform: !readonly && hovered === star ? "scale(1.35)" : "scale(1)",
              filter: filled ? "drop-shadow(0 0 5px rgba(245,197,24,0.9))" : "none",
              flexShrink: 0,
            }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? "#f5c518" : "none"} stroke={filled ? "#f5c518" : "#3a3a3a"}
              strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      })}
      {value > 0 && (
        <span style={{ color: "#f5c518", fontFamily: "'Bebas Neue', sans-serif", fontSize: size * 0.75, marginLeft: "3px" }}>
          {value}/5
        </span>
      )}
    </div>
  );
}

// ── Modal de detalle ────────────────────────────────────────────────────────
function DetailModal({ item, onClose, onToggle, onRate, onRemove }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const watched = item.watched;
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchDetails(item.id, item.media_type)
      .then(d => setDetails(d))
      .finally(() => setLoading(false));
    return () => { document.body.style.overflow = ""; };
  }, [item.id, item.media_type]);

  const genres = details?.genres?.map(g => g.name) || [];
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;
  const seasons = details?.number_of_seasons;
  const tagline = details?.tagline;
  const overview = details?.overview || item.overview;
  const cast = details?.credits?.cast?.slice(0, 6) || [];
  const director = details?.credits?.crew?.find(c => c.job === "Director");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
        animation: "fadeOverlay 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "780px",
          background: "#0f0f0f",
          border: "1px solid #222",
          borderRadius: "6px",
          overflow: "hidden",
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "slideUp 0.25s ease",
          position: "relative",
        }}
      >
        {/* Backdrop */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", flexShrink: 0 }}>
          {item.backdrop_path ? (
            <img src={`${BACKDROP_BASE}${item.backdrop_path}`} alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#161616" }} />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(15,15,15,1) 100%)"
          }} />

          {/* Cerrar */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,0.7)", border: "1px solid #333",
            color: "#888", width: "32px", height: "32px",
            borderRadius: "50%", cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Contenido */}
        <div style={{ padding: "0 28px 28px", marginTop: "-60px", position: "relative" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
            {/* Poster pequeño */}
            {item.poster_path && (
              <img src={`${IMG_BASE}${item.poster_path}`} alt={title}
                style={{
                  width: "90px", height: "135px", objectFit: "cover",
                  borderRadius: "4px", border: "2px solid #222",
                  flexShrink: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.8)"
                }} />
            )}
            <div style={{ flex: 1, paddingBottom: "4px" }}>
              {/* Tipo badge */}
              <div style={{
                display: "inline-block", marginBottom: "6px",
                background: item.media_type === "tv" ? "#1a5c8a" : "#7a0000",
                color: "#ccc", fontSize: "9px", fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "1.2px", padding: "2px 7px", borderRadius: "2px"
              }}>{item.media_type === "tv" ? "Serie" : "Película"}</div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px, 4vw, 30px)",
                letterSpacing: "1px", color: "#fff", lineHeight: 1.1,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)"
              }}>{title}</div>

              {tagline && (
                <div style={{ color: "#555", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "12px", marginTop: "4px" }}>
                  "{tagline}"
                </div>
              )}

              <div style={{ display: "flex", gap: "14px", marginTop: "8px", flexWrap: "wrap" }}>
                {year && <Meta label={year} />}
                {runtime && <Meta label={runtime} />}
                {seasons && <Meta label={`${seasons} temporada${seasons > 1 ? "s" : ""}`} />}
                {item.vote_average > 0 && <Meta label={`★ ${item.vote_average.toFixed(1)} TMDB`} color="#f5c518" />}
              </div>
            </div>
          </div>

          {/* Géneros */}
          {genres.length > 0 && (
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "16px" }}>
              {genres.map(g => (
                <span key={g} style={{
                  padding: "3px 10px", fontSize: "10px",
                  fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px",
                  background: "#1a1a1a", color: "#777",
                  border: "1px solid #2a2a2a", borderRadius: "2px"
                }}>{g}</span>
              ))}
            </div>
          )}

          {/* Sinopsis */}
          {overview && (
            <div style={{ marginTop: "18px" }}>
              <div style={{ color: "#444", fontSize: "9px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px", marginBottom: "6px" }}>
                SINOPSIS
              </div>
              <p style={{ color: "#aaa", fontFamily: "Georgia, serif", fontSize: "13px", lineHeight: 1.7 }}>
                {overview}
              </p>
            </div>
          )}

          {/* Director */}
          {director && (
            <div style={{ marginTop: "14px" }}>
              <span style={{ color: "#444", fontSize: "9px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>DIRECCIÓN · </span>
              <span style={{ color: "#888", fontFamily: "Georgia, serif", fontSize: "12px" }}>{director.name}</span>
            </div>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ color: "#444", fontSize: "9px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px", marginBottom: "8px" }}>
                REPARTO
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {cast.map(c => (
                  <div key={c.id} style={{ textAlign: "center", width: "56px" }}>
                    {c.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w185${c.profile_path}`} alt={c.name}
                        style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "50%", border: "1px solid #2a2a2a" }} />
                    ) : (
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a" }} />
                    )}
                    <div style={{ color: "#666", fontSize: "9px", fontFamily: "Georgia, serif", marginTop: "4px", lineHeight: 1.2 }}>
                      {c.name.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div style={{ color: "#333", fontFamily: "Georgia, serif", fontSize: "12px", marginTop: "16px", fontStyle: "italic" }}>
              Cargando detalles...
            </div>
          )}

          {/* Divider */}
          <div style={{ borderTop: "1px solid #1a1a1a", marginTop: "22px", paddingTop: "18px" }}>
            {/* Mi calificación */}
            {watched && (
              <div style={{ marginBottom: "14px" }}>
                <div style={{ color: "#444", fontSize: "9px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px", marginBottom: "8px" }}>
                  MI CALIFICACIÓN
                </div>
                <StarRating value={item.rating || 0} onChange={(v) => onRate(item.id, v)} size={22} />
              </div>
            )}

            {/* Acciones */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => onToggle(item.id)}
                style={{
                  padding: "8px 20px", fontSize: "11px",
                  fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1.5px",
                  background: watched ? "rgba(0,110,0,0.9)" : "rgba(140,0,0,0.9)",
                  color: "#fff", border: `1px solid ${watched ? "#009900" : "#990000"}`,
                  borderRadius: "3px", cursor: "pointer",
                }}
              >
                {watched ? "✓ VISTA" : "MARCAR COMO VISTA"}
              </button>
              <button
                onClick={() => { onRemove(item.id); onClose(); }}
                style={{
                  padding: "8px 16px", fontSize: "11px",
                  fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1.5px",
                  background: "transparent", color: "#444",
                  border: "1px solid #222", borderRadius: "3px", cursor: "pointer",
                }}
              >
                ELIMINAR DE LA LISTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, color = "#555" }) {
  return (
    <span style={{ color, fontFamily: "Georgia, serif", fontSize: "11px" }}>{label}</span>
  );
}

// ── Tarjeta ─────────────────────────────────────────────────────────────────
function MediaCard({ item, onToggle, onRemove, onRate, onOpen }) {
  const [hover, setHover] = useState(false);
  const [justWatched, setJustWatched] = useState(false);
  const watched = item.watched;
  const type = item.media_type === "tv" ? "Serie" : "Película";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const title = item.title || item.name;

  function handleToggle(e) {
    e.stopPropagation();
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
      onClick={() => onOpen(item)}
      style={{
        position: "relative", borderRadius: "3px", overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hover ? "translateY(-7px) scale(1.02)" : "none",
        boxShadow: hover
          ? item.rating ? "0 18px 44px rgba(245,197,24,0.22)"
            : watched ? "0 18px 44px rgba(60,200,60,0.22)"
              : "0 18px 44px rgba(200,40,40,0.32)"
          : "0 4px 14px rgba(0,0,0,0.7)",
        background: "#111", aspectRatio: "2/3",
      }}
    >
      {item.poster_path ? (
        <img src={`${IMG_BASE}${item.poster_path}`} alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
      ) : (
        <div style={{
          position: "absolute", inset: 0, background: "#161616",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "14px", textAlign: "center"
        }}>
          <span style={{ color: "#444", fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px" }}>{title}</span>
        </div>
      )}

      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: watched
          ? item.rating
            ? "linear-gradient(180deg, rgba(0,0,0,0.05) 25%, rgba(20,12,0,0.96) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,35,0,0.96) 100%)"
          : "linear-gradient(180deg, rgba(0,0,0,0.0) 35%, rgba(70,0,0,0.95) 100%)",
        transition: "background 0.4s ease",
      }} />

      <div style={{
        position: "absolute", top: 7, left: 7, zIndex: 3,
        background: item.media_type === "tv" ? "#1a5c8a" : "#7a0000",
        color: "#ccc", fontSize: "8px", fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "1.2px", padding: "2px 6px", borderRadius: "2px"
      }}>{type}</div>

      <div style={{
        position: "absolute", top: 7, right: 7, zIndex: 3,
        background: watched ? "rgba(0,120,0,0.92)" : "rgba(160,0,0,0.92)",
        color: "#fff", fontSize: "8px", fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "1px", padding: "2px 7px", borderRadius: "2px",
        border: `1px solid ${watched ? "#00cc00" : "#cc0000"}`,
        textShadow: `0 0 6px ${watched ? "#00ff00" : "#ff0000"}`
      }}>{watched ? "✓ VISTA" : "POR VER"}</div>

      {justWatched && (
        <div style={{
          position: "absolute", top: "38%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0.88)", border: "1px solid #f5c518",
          borderRadius: "4px", padding: "8px 14px",
          zIndex: 10, textAlign: "center", animation: "popIn 0.25s ease", whiteSpace: "nowrap",
        }}>
          <div style={{ fontSize: "16px", marginBottom: "3px" }}>⭐</div>
          <div style={{ color: "#f5c518", fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "1.5px" }}>
            ¿QUÉ TE PARECIÓ?
          </div>
        </div>
      )}

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 9px 9px", zIndex: 2 }}>
        <div style={{
          color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(11px, 1.5vw, 14px)", lineHeight: 1.2,
          letterSpacing: "0.5px", marginBottom: "2px", textShadow: "0 1px 6px rgba(0,0,0,1)"
        }}>{title}</div>

        <div style={{ color: "#777", fontSize: "10px", fontFamily: "Georgia, serif", marginBottom: "5px" }}>
          {year}{item.vote_average ? ` · ★ ${item.vote_average.toFixed(1)}` : ""}
        </div>

        {watched && (
          <div style={{ marginBottom: "7px" }} onClick={e => e.stopPropagation()}>
            <StarRating value={item.rating || 0} onChange={(v) => onRate(item.id, v)} size={14} />
            {!item.rating && (
              <div style={{ color: "#444", fontSize: "9px", fontFamily: "Georgia, serif", fontStyle: "italic", marginTop: "2px" }}>
                tu calificación
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={handleToggle} style={{
            flex: 1, padding: "5px 3px", fontSize: "9px",
            fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.8px",
            background: watched ? "rgba(0,110,0,0.85)" : "rgba(140,0,0,0.85)",
            color: "#eee", border: `1px solid ${watched ? "#009900" : "#990000"}`,
            borderRadius: "2px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            {watched ? "✓ VISTA" : "MARCAR VISTA"}
          </button>
          <button onClick={e => { e.stopPropagation(); onRemove(item.id); }} style={{
            padding: "5px 8px", fontSize: "11px",
            background: "rgba(20,20,20,0.9)", color: "#444",
            border: "1px solid #222", borderRadius: "2px", cursor: "pointer",
          }}>✕</button>
        </div>
      </div>
    </div>
  );
}

// ── Search Dropdown ──────────────────────────────────────────────────────────
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
          <div key={r.id} onClick={() => onSelect(r)}
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

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [list, setList] = useState(loadList);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => saveList(list), 0);
    return () => clearTimeout(timeout);
  }, [list]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [query]); // eslint-disable-line

  useEffect(() => {
    function handle(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false); setResults([]);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Cerrar modal con Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setSelectedItem(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function addItem(item) {
    if (list.find(i => i.id === item.id)) return;
    setList(prev => [{ ...item, watched: false, rating: 0, addedAt: Date.now() }, ...prev]);
    setQuery(""); setResults([]);
  }
  function toggleWatched(id) {
    setList(prev => prev.map(i => i.id === id ? { ...i, watched: !i.watched } : i));
    // Actualizar el item seleccionado si está abierto
    setSelectedItem(prev => prev?.id === id ? { ...prev, watched: !prev.watched } : prev);
  }
  function rateItem(id, rating) {
    setList(prev => prev.map(i => i.id === id ? { ...i, rating, watched: rating > 0 ? true : i.watched } : i));
    setSelectedItem(prev => prev?.id === id ? { ...prev, rating, watched: rating > 0 ? true : prev.watched } : prev);
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
        @keyframes fadeOverlay {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
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
          maxWidth: "1400px", margin: "0 auto", padding: "14px 0 0",
          display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap"
        }}>
          <div style={{ minWidth: "170px" }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px",
              letterSpacing: "4px", color: "#fff", textShadow: "0 0 24px rgba(180,0,0,0.5)"
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
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "4px 13px", fontSize: "10px",
              fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1.5px",
              background: filter === f.id ? "#a00" : "transparent",
              color: filter === f.id ? "#fff" : "#3c3c3c",
              border: filter === f.id ? "1px solid #cc0000" : "1px solid #1c1c1c",
              borderRadius: "2px", cursor: "pointer", transition: "all 0.2s",
            }}>{f.label}</button>
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
                onOpen={setSelectedItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onToggle={toggleWatched}
          onRate={rateItem}
          onRemove={removeItem}
        />
      )}
    </>
  );
}
