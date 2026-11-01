import { useEffect, useMemo, useState } from "react";
import { IMG, ROLES, anioDe, persona } from "../lib/tmdb";
import { FICHAS } from "../data/personas";
import TextoMd from "./TextoMd";

// Ficha de un director, director de fotografía o montajista: quién es y toda su filmografía,
// con cada película para marcar como vista (aunque todavía no esté en el catálogo).
export default function Ficha({ id, porTmdb, marcas, onAbrir, onMarcar, onVolver, onCompartir }) {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const propia = FICHAS[id];

  useEffect(() => {
    let vigente = true;
    persona(id)
      .then(d => { if (vigente) { setDatos(d); setError(null); } })
      .catch(e => vigente && setError(e.message));
    return () => { vigente = false; };
  }, [id]);

  const enCatalogo = r => porTmdb.get(`${r.media_type === "tv" ? "tv" : "movie"}-${r.id}`);
  const vista = r => Boolean(marcas[enCatalogo(r)?.id]?.visto);

  // Una sección por rol (dirección, fotografía, montaje), la principal primero.
  const secciones = useMemo(() => {
    const crew = datos?.combined_credits?.crew || [];
    const principal = propia?.principal || {
      Directing: "Director", Camera: "Director of Photography", Editing: "Editor",
    }[datos?.known_for_department];
    return ROLES
      .map(r => {
        const unicas = new Map();
        for (const c of crew) if (c.job === r.job) unicas.set(`${c.media_type}-${c.id}`, c);
        const pelis = [...unicas.values()].sort((a, b) => (anioDe(a) ?? 9999) - (anioDe(b) ?? 9999));
        return { ...r, pelis };
      })
      .filter(s => s.pelis.length)
      .sort((a, b) => (b.job === principal) - (a.job === principal));
  }, [datos, propia]);

  const todas = [...new Map(secciones.flatMap(s => s.pelis).map(p => [`${p.media_type}-${p.id}`, p])).values()];
  const vistas = todas.filter(vista).length;
  const documental = propia?.documental &&
    (datos?.combined_credits?.cast || []).find(c => c.id === propia.documental.tmdb_id);

  if (error) return (
    <div className="banner"><span>No pude cargar la ficha: {error}</span><button className="boton chico" onClick={onVolver}>VOLVER</button></div>
  );
  if (!datos) return <div className="vacio-grande">CARGANDO…</div>;

  const nombre = propia?.nombre || datos.name;
  const pct = todas.length ? Math.round((vistas / todas.length) * 100) : 0;

  return (
    <div className="ficha">
      <div className="ficha-barra">
        <button type="button" className="volver" onClick={onVolver}>← VOLVER</button>
        <button type="button" className="boton fantasma chico" onClick={() => onCompartir(`/persona/${id}`, nombre)}>↗ COMPARTIR</button>
      </div>

      <header className="ficha-cabeza">
        {datos.profile_path
          ? <img src={`${IMG}w185${datos.profile_path}`} alt="" />
          : <span className="sin-foto" />}
        <div>
          <h1>{nombre}</h1>
          <div className="rol">{propia?.rol || secciones.map(s => s.titulo.toLowerCase()).join(" · ")}</div>
          {propia?.bajada && <p className="bajada">{propia.bajada}</p>}
        </div>
      </header>

      <div className="progreso">
        <div className="linea">
          <div className="grande"><b>{vistas}</b> DE {todas.length} VISTAS</div>
          <div className="chico">{pct}%</div>
        </div>
        <div className="barra"><div style={{ width: `${pct}%` }} /></div>
      </div>

      {propia?.documental && (
        <div className="documental">
          <div>
            <div className="etiqueta">EL DOCUMENTAL</div>
            <b>{propia.documental.titulo}</b>
            <small>{propia.documental.donde}</small>
          </div>
          <div className="acciones-doc">
            {documental && (
              <button type="button" className="boton fantasma chico" onClick={() => onAbrir(documental)}>FICHA</button>
            )}
            <a className="boton oro chico" href={propia.documental.url} target="_blank" rel="noreferrer">▶ VER EN CINE.AR</a>
          </div>
        </div>
      )}

      <div className="historia-texto">
        {propia?.texto
          ? <TextoMd texto={propia.texto} />
          : datos.biography && <TextoMd texto={datos.biography} />}
      </div>

      {secciones.map(s => {
        const hechas = s.pelis.filter(vista).length;
        return (
          <section key={s.job} className="capitulo">
            <div className="para-ver">
              <span>{s.plural}</span>
              <span className="cuenta">{hechas}/{s.pelis.length} vistas</span>
            </div>
            <ol className="las41 filmografia">
              {s.pelis.map(p => {
                const v = vista(p);
                const c = enCatalogo(p);
                const listas = [
                  c?.listas.includes("cine_argentino") && "Cine argentino",
                  c?.listas.includes("1001") && "1001 películas",
                  p.media_type === "tv" && "Serie",
                ].filter(Boolean).join(" · ");
                const titulo = p.title || p.name;
                return (
                  <li key={`${p.media_type}-${p.id}`} className={v ? "vista" : ""}>
                    <button type="button" className="check" aria-pressed={v}
                      aria-label={v ? `Desmarcar ${titulo} como vista` : `Marcar ${titulo} como vista`}
                      onClick={() => onMarcar(p, { visto: !v })}>✓</button>
                    <span className="anio">{anioDe(p) || "—"}</span>
                    <button type="button" className="cuerpo" onClick={() => onAbrir(p)}>
                      <span className="titulo">{titulo}</span>
                      {listas && <span className="porque">{listas}</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
