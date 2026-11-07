import { IMG } from "../lib/tmdb";
import Estrellas from "./Estrellas";
import { TITULOS_LIBRO } from "../data/titulosLibro";

export default function Tarjeta({ peli, marca, numero, mostrarDuda, onAbrir, onMarcar }) {
  const vista = Boolean(marca?.visto);
  const titulo = peli.titulo;
  // Si el libro (edición española) la llama distinto, va debajo.
  const libro = TITULOS_LIBRO[`${peli.media_type}-${peli.tmdb_id}`];
  return (
    <div className={`tarjeta${vista ? " vista" : ""}`} role="button" tabIndex={0}
      onClick={() => onAbrir(peli)}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onAbrir(peli))}>
      {peli.poster_path ? (
        <img className="poster" src={`${IMG}w342${peli.poster_path}`} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className="sin-poster">{titulo}</div>
      )}
      <div className="velo" />
      {numero != null && <div className="numero">#{numero}</div>}
      {mostrarDuda && peli.cruce !== "segura" && <div className="duda" title="Falta confirmar cuál es">?</div>}
      <button type="button" className="check" aria-pressed={vista}
        aria-label={vista ? `Desmarcar ${titulo} como vista` : `Marcar ${titulo} como vista`}
        onClick={e => { e.stopPropagation(); onMarcar(peli, { visto: !vista }); }}>
        ✓
      </button>
      <div className="pie">
        <div className="titulo">{titulo}</div>
        {libro && <div className="en-libro">Libro: {libro}</div>}
        <div className="sub">{peli.anio || ""}{peli.media_type === "tv" ? " · Serie" : ""}</div>
        {vista && (
          <div className="estrellas-tarjeta">
            <Estrellas valor={marca.puntaje} tamano={13} onCambiar={v => onMarcar(peli, { puntaje: v })} />
          </div>
        )}
      </div>
    </div>
  );
}
