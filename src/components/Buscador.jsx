import { useEffect, useRef, useState } from "react";
import { IMG, anioDe, buscar, tituloDe } from "../lib/tmdb";

// Búsqueda en TMDB con desplegable de resultados.
// Tocar un resultado llama a onElegir (abrir la ficha); el botón "+ LISTA", si hay onAgregar, la suma directo.
export default function Buscador({ placeholder, tipo = "multi", inicial = "", etiquetaDe, onElegir, onAgregar, puedeAgregar }) {
  const [texto, setTexto] = useState(inicial);
  const [resultados, setResultados] = useState([]);
  const [estado, setEstado] = useState("quieto"); // quieto | buscando | listo | error
  const [abierto, setAbierto] = useState(false);
  const caja = useRef(null);

  useEffect(() => {
    const q = texto.trim();
    if (q.length < 2) return;
    let vigente = true;
    const t = setTimeout(() => {
      setEstado("buscando");
      buscar(q, tipo)
        .then(r => { if (vigente) { setResultados(r); setEstado("listo"); } })
        .catch(() => { if (vigente) setEstado("error"); });
    }, 350);
    return () => { vigente = false; clearTimeout(t); };
  }, [texto, tipo]);

  useEffect(() => {
    function fuera(e) { if (caja.current && !caja.current.contains(e.target)) setAbierto(false); }
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, []);

  const mostrar = abierto && texto.trim().length >= 2;

  return (
    <div className="buscador" ref={caja}>
      <input className="campo" type="search" enterKeyHint="search" placeholder={placeholder}
        value={texto}
        onChange={e => { setTexto(e.target.value); setAbierto(true); }}
        onFocus={() => setAbierto(true)}
        onKeyDown={e => e.key === "Escape" && setAbierto(false)} />
      {mostrar && (
        <div className="desplegable">
          {estado === "buscando" && !resultados.length && <div className="vacio">Buscando…</div>}
          {estado === "error" && <div className="vacio">No se pudo buscar. Probá de nuevo.</div>}
          {estado === "listo" && !resultados.length && <div className="vacio">Sin resultados.</div>}
          {resultados.map(r => {
            const titulo = tituloDe(r);
            const anio = anioDe(r);
            const cerrar = () => { setTexto(""); setResultados([]); setAbierto(false); };
            const agregable = onAgregar && (!puedeAgregar || puedeAgregar(r));
            return (
              <div key={`${r.media_type}-${r.id}`} className="resultado-fila">
              <button type="button" className="resultado"
                onClick={() => { onElegir(r); cerrar(); }}>
                {r.poster_path
                  ? <img src={`${IMG}w92${r.poster_path}`} alt="" loading="lazy" />
                  : <div className="sin-img" />}
                <div>
                  <div className="t">{titulo}</div>
                  <div className="s">
                    {r.media_type === "tv" ? "Serie" : "Película"}{anio ? ` · ${anio}` : ""}
                    {r.original_title && r.original_title !== titulo ? ` · ${r.original_title}` : ""}
                  </div>
                </div>
                {etiquetaDe?.(r) && <span className="ya">{etiquetaDe(r)}</span>}
              </button>
              {agregable && (
                <button type="button" className="agregar-lista" title="Sumar a mi lista sin abrirla"
                  onClick={() => { onAgregar(r); cerrar(); }}>+ LISTA</button>
              )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
