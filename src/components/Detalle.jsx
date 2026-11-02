import { useEffect, useRef, useState } from "react";
import { IMG, detalles, dondeVerDe, elegirTrailer, equipoDe } from "../lib/tmdb";
import { LINKS, NOMBRES, NOTAS } from "../data/dondeVer";
import { PUESTOS } from "../data/encuesta2022";
import { VER_COMPLETA } from "../data/verCompleta";
import { corregirPelicula } from "../lib/datos";
import { POR_QUE_VERLA, QUE_APRENDES, capituloDe } from "../data/cineArgentino";
import Estrellas from "./Estrellas";
import Buscador from "./Buscador";

export default function Detalle({ peli, marca, admin, onCerrar, onMarcar, onCorregida, onPersona, onCompartir }) {
  const [extra, setExtra] = useState(null);
  const [verla, setVerla] = useState(false);
  const reproductor = useRef(null);
  const vista = Boolean(marca?.visto);
  const enMiLista = Boolean(marca?.en_mi_lista);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tecla = e => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", tecla); };
  }, [onCerrar]);

  useEffect(() => {
    if (!peli.tmdb_id) return;
    let vigente = true;
    detalles(peli.tmdb_id, peli.media_type).then(d => vigente && setExtra(d)).catch(() => {});
    return () => { vigente = false; };
  }, [peli.tmdb_id, peli.media_type]);

  const trailer = peli.trailer_youtube || elegirTrailer(extra?.videos?.results);
  const generos = extra?.genres?.map(g => g.name) || [];
  const duracion = extra?.runtime ? `${Math.floor(extra.runtime / 60)}h ${extra.runtime % 60}m` : null;
  const temporadas = extra?.number_of_seasons;
  const reparto = extra?.credits?.cast?.slice(0, 8) || [];
  const equipo = extra ? equipoDe(extra, peli.media_type) : [];
  const donde = dondeVerDe(extra);
  const links = LINKS[`${peli.media_type}-${peli.tmdb_id}`] || [];
  const completa = VER_COMPLETA[`${peli.media_type}-${peli.tmdb_id}`];

  function verCompleta() {
    setVerla(true);
    setTimeout(() => reproductor.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
  const sinopsis = peli.sinopsis || extra?.overview;
  const esArg = peli.listas.includes("cine_argentino");
  const porQue = esArg ? POR_QUE_VERLA[peli.titulo] : null;
  const original = peli.titulo_original && peli.titulo_original !== peli.titulo ? peli.titulo_original : null;

  return (
    <div className="fondo-modal" onClick={onCerrar}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={peli.titulo} onClick={e => e.stopPropagation()}>
        <div className="fondo">
          {peli.backdrop_path && <img src={`${IMG}w1280${peli.backdrop_path}`} alt="" />}
        </div>
        <button className="cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>

        <div className="cuerpo">
          <div className="cabeza">
            {peli.poster_path && <img src={`${IMG}w342${peli.poster_path}`} alt="" />}
            <div>
              <h1>{peli.titulo}</h1>
              {original && <div className="original">{original}</div>}
              <div className="meta">
                {peli.anio && <span>{peli.anio}</span>}
                {duracion && <span>{duracion}</span>}
                {temporadas && <span>{temporadas} temporada{temporadas > 1 ? "s" : ""}</span>}
                {peli.vote_average > 0 && <span className="oro">★ {Number(peli.vote_average).toFixed(1)} TMDB</span>}
              </div>
            </div>
          </div>

          <div className="insignias">
            {peli.listas.includes("1001") && (
              <span className="insignia libro">1001 películas{peli.pagina_libro ? ` · pág. ${peli.pagina_libro}` : ""}</span>
            )}
            {esArg && capituloDe(peli.titulo) && (
              <span className="insignia arg">Cine argentino · cap. {capituloDe(peli.titulo).numero}: {capituloDe(peli.titulo).titulo}</span>
            )}
            {peli.listas.includes("encuesta2022") && PUESTOS[peli.tmdb_id] && (
              <span className="insignia arg">Las 100 de la crítica · puesto {PUESTOS[peli.tmdb_id]}</span>
            )}
            {peli.listas.includes("clasicos") && <span className="insignia">Clásico</span>}
            {enMiLista && <span className="insignia">En mi lista</span>}
            {generos.map(g => <span key={g} className="insignia">{g}</span>)}
          </div>

          {verla && completa && (
            <div className="bloque reproductor" ref={reproductor}>
              {completa.youtube ? (
                <iframe src={`https://www.youtube-nocookie.com/embed/${completa.youtube}?autoplay=1`} title={peli.titulo}
                  allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : completa.archive ? (
                <iframe src={`https://archive.org/embed/${completa.archive}`} title={peli.titulo}
                  allow="fullscreen" allowFullScreen />
              ) : (
                <video controls autoPlay playsInline preload="metadata">
                  {completa.webm && <source src={completa.webm} type="video/webm" />}
                  {completa.mov && <source src={completa.mov} type="video/quicktime" />}
                </video>
              )}
              <div className="fuente-donde">
                {completa.credito} · {completa.licencia} · Copia: <a href={completa.fuente.url} target="_blank" rel="noreferrer">{completa.fuente.nombre}</a>
              </div>
            </div>
          )}

          {porQue && (
            <div className="bloque por-que">
              <div className="etiqueta">POR QUÉ VERLA{QUE_APRENDES[peli.titulo] ? ` · ${QUE_APRENDES[peli.titulo].toUpperCase()}` : ""}</div>
              <p>{porQue}</p>
            </div>
          )}

          {sinopsis && (
            <div className="bloque">
              <div className="etiqueta">SINOPSIS</div>
              <p>{sinopsis}</p>
            </div>
          )}

          {equipo.length > 0 ? (
            <div className="bloque equipo">
              {equipo.map(r => (
                <div key={r.job}>
                  <div className="etiqueta">{r.titulo}</div>
                  {r.gente.map(p => (
                    <button key={p.id} type="button" className="persona" onClick={() => onPersona(p.id)}>
                      {p.profile_path ? <img src={`${IMG}w185${p.profile_path}`} alt="" loading="lazy" /> : <span className="sin" />}
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : peli.direccion && (
            <div className="bloque">
              <div className="etiqueta">DIRECCIÓN</div>
              <p>{peli.direccion}</p>
            </div>
          )}

          {(links.length > 0 || donde.grupos.length > 0 || peli.donde_ver) && (
            <div className="bloque donde">
              <div className="etiqueta">DÓNDE VERLA EN ARGENTINA</div>
              {links.map(l => (
                <a key={l.url} className="boton oro chico" href={l.url} target="_blank" rel="noreferrer">
                  ▶ VER EN {l.nombre.toUpperCase()}<small> · {l.nota}</small>
                </a>
              ))}
              {donde.grupos.map(g => (
                <div key={g.titulo} className="donde-grupo">
                  <span className="donde-tipo">{g.titulo}</span>
                  {g.plataformas.map(p => (
                    <a key={p.provider_id} className="plataforma" href={donde.link} target="_blank" rel="noreferrer"
                      title={NOTAS[p.provider_name] ? `${NOMBRES[p.provider_name] || p.provider_name} · ${NOTAS[p.provider_name]}` : p.provider_name}>
                      <img src={`${IMG}w92${p.logo_path}`} alt="" loading="lazy" />
                      <span>{NOMBRES[p.provider_name] || p.provider_name}</span>
                    </a>
                  ))}
                </div>
              ))}
              {peli.donde_ver && <p>{peli.donde_ver}</p>}
              {donde.grupos.length > 0 && <div className="fuente-donde">Datos de JustWatch. Pueden cambiar.</div>}
            </div>
          )}

          {reparto.length > 0 && (
            <div className="bloque">
              <div className="etiqueta">REPARTO</div>
              <div className="reparto">
                {reparto.map(c => (
                  <div key={c.id}>
                    {c.profile_path ? <img src={`${IMG}w185${c.profile_path}`} alt="" loading="lazy" /> : <span className="sin" />}
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {vista && (
            <div className="bloque">
              <div className="etiqueta">MI CALIFICACIÓN</div>
              <Estrellas valor={marca.puntaje} tamano={26} onCambiar={v => onMarcar(peli, { puntaje: v })} />
            </div>
          )}

          <div className="acciones">
            {completa && !verla && (
              <button className="boton oro" onClick={verCompleta}>▶ VER COMPLETA</button>
            )}
            {trailer && !completa && (
              <a className="boton oro" href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" rel="noreferrer">
                ▶ VER TRÁILER
              </a>
            )}
            <button className={`boton ${vista ? "verde" : "rojo"}`} onClick={() => onMarcar(peli, { visto: !vista })}>
              {vista ? "✓ VISTA" : "MARCAR COMO VISTA"}
            </button>
            <button className="boton fantasma" onClick={() => onMarcar(peli, { en_mi_lista: !enMiLista })}>
              {enMiLista ? "QUITAR DE MI LISTA" : "+ MI LISTA"}
            </button>
            {peli.id != null && (
              <button className="boton fantasma" onClick={() => onCompartir(`/p/${peli.id}`, peli.titulo)}>↗ COMPARTIR</button>
            )}
          </div>

          {admin && peli.cruce !== "segura" && <Revision peli={peli} onCorregida={onCorregida} />}
        </div>
      </div>
    </div>
  );
}

// "¿Es esta?": el admin confirma a qué película de TMDB corresponde el título.
function Revision({ peli, onCorregida }) {
  const [estado, setEstado] = useState(null);
  const candidatos = peli.candidatos || [];

  async function elegir(c, mediaType = peli.media_type) {
    setEstado("guardando");
    try {
      onCorregida(await corregirPelicula(peli.id, c, mediaType));
      setEstado(null);
    } catch (e) {
      setEstado({ error: e.message });
    }
  }

  return (
    <div className="revision">
      <h3>¿ES ESTA?</h3>
      <p>
        En el libro figura como <b>{peli.titulo}</b>{peli.pagina_libro ? ` (pág. ${peli.pagina_libro})` : ""}.
        Elegí la correcta y se corrige para todos.
      </p>
      {candidatos.length > 0 && (
        <div className="candidatos">
          {candidatos.map(c => (
            <button key={c.tmdb_id} className="candidato" disabled={estado === "guardando"} onClick={() => elegir(c)}>
              {c.poster_path ? <img src={`${IMG}w185${c.poster_path}`} alt="" loading="lazy" /> : <span className="sin" />}
              <div>{c.titulo}<small>{c.anio || "s/f"}{c.original && c.original !== c.titulo ? ` · ${c.original}` : ""}</small></div>
            </button>
          ))}
        </div>
      )}
      <div className="otra">
        <Buscador placeholder="Buscar otra en TMDB…" inicial=""
          onElegir={r => elegir({ tmdb_id: r.id }, r.media_type === "tv" ? "tv" : "movie")} />
      </div>
      <div className="otra">
        <button className="boton fantasma chico" disabled={estado === "guardando"} onClick={() => elegir(null)}>
          NO ESTÁ EN TMDB
        </button>
      </div>
      {estado === "guardando" && <p>Guardando…</p>}
      {estado?.error && <p style={{ color: "#ff6b6b" }}>{estado.error}</p>}
    </div>
  );
}
