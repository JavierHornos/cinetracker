import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigurado } from "./lib/supabase";
import * as db from "./lib/datos";
import {
  CAPITULOS, HISTORIA_CIERRE, HISTORIA_FUENTES, HISTORIA_INTRO, POR_QUE_VERLA, QUE_APRENDES,
} from "./data/cineArgentino";
import TextoMd from "./components/TextoMd";
import { IMG } from "./lib/tmdb";
import Estrellas from "./components/Estrellas";
import Login from "./components/Login";
import Buscador from "./components/Buscador";
import Tarjeta from "./components/Tarjeta";
import Detalle from "./components/Detalle";

const LISTA_VIEJA = "cinetracker_list_v2";
const LISTA_VIEJA_IMPORTADA = "cinetracker_importado";

function leer(clave, porDefecto) {
  try { return localStorage.getItem(clave) ?? porDefecto; } catch { return porDefecto; }
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, valor); } catch { /* sin almacenamiento local */ }
}
function listaVieja() {
  if (leer(LISTA_VIEJA_IMPORTADA, "") === "1") return [];
  try { return JSON.parse(localStorage.getItem(LISTA_VIEJA)) || []; } catch { return []; }
}
const normalizar = s => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function App() {
  const [sesion, setSesion] = useState(undefined);

  useEffect(() => {
    if (!supabaseConfigurado) return;
    supabase.auth.getSession().then(({ data }) => setSesion(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigurado) {
    return (
      <main className="pantalla-centro">
        <div className="mensaje">Faltan <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> en el archivo .env.</div>
      </main>
    );
  }
  if (sesion === undefined) return <main className="pantalla-centro"><div className="logo">🎬</div></main>;
  if (!sesion) return <Login />;
  return <Cinetracker usuario={sesion.user} />;
}

const SECCIONES = [
  { id: "1001", titulo: "1001 PELÍCULAS" },
  { id: "argentino", titulo: "CINE ARGENTINO" },
  { id: "mia", titulo: "MI LISTA" },
];

function Cinetracker({ usuario }) {
  const [catalogo, setCatalogo] = useState([]);
  const [marcas, setMarcas] = useState({});
  const [admin, setAdmin] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [seccion, setSeccion] = useState(() => leer("cinetracker_seccion", "1001"));
  const [abiertaId, setAbiertaId] = useState(null);
  const [aviso, setAviso] = useState(null);

  const avisar = useCallback(texto => {
    setAviso(texto);
    setTimeout(() => setAviso(a => (a === texto ? null : a)), 3500);
  }, []);

  const aplicar = useCallback(promesa => promesa
    .then(([cat, mar, adm]) => { setCatalogo(cat); setMarcas(mar); setAdmin(adm); setError(null); })
    .catch(e => setError(e.message || String(e)))
    .finally(() => setCargando(false)), []);

  const traerTodo = useCallback(
    () => Promise.all([db.cargarCatalogo(), db.cargarMarcas(), db.esAdmin(usuario.id)]), [usuario.id]);

  const recargar = useCallback(() => aplicar(traerTodo()), [aplicar, traerTodo]);

  useEffect(() => {
    let vigente = true;
    aplicar(traerTodo().then(r => (vigente ? r : new Promise(() => {}))));
    return () => { vigente = false; };
  }, [aplicar, traerTodo]);

  function elegirSeccion(id) {
    setSeccion(id);
    guardar("cinetracker_seccion", id);
    window.scrollTo({ top: 0 });
  }

  const porTmdb = useMemo(() => {
    const m = new Map();
    for (const p of catalogo) if (p.tmdb_id) m.set(`${p.media_type}-${p.tmdb_id}`, p);
    return m;
  }, [catalogo]);

  // Cambia visto / puntaje / en_mi_lista con respuesta inmediata en pantalla.
  async function marcar(peli, cambios) {
    const previa = marcas[peli.id];
    const base = previa || { pelicula_id: peli.id, visto: false, puntaje: 0, en_mi_lista: false, visto_at: null };
    const nueva = { ...base, ...cambios };
    if (cambios.puntaje > 0) nueva.visto = true;
    if (nueva.visto && !base.visto) nueva.visto_at = new Date().toISOString();
    if (cambios.visto === false) { nueva.visto_at = null; nueva.puntaje = 0; }
    if (cambios.en_mi_lista && !base.en_mi_lista) nueva.agregado_at = new Date().toISOString();
    const vacia = !nueva.visto && !nueva.puntaje && !nueva.en_mi_lista;

    setMarcas(m => {
      const copia = { ...m };
      if (vacia) delete copia[peli.id]; else copia[peli.id] = nueva;
      return copia;
    });
    try {
      if (vacia) await db.borrarMarca(peli.id);
      else await db.guardarMarca(usuario.id, nueva);
    } catch {
      setMarcas(m => ({ ...m, [peli.id]: previa }));
      avisar("No se pudo guardar. Revisá la conexión.");
    }
  }

  async function sumarDeTmdb(r, extra) {
    const clave = `${r.media_type === "tv" ? "tv" : "movie"}-${r.id}`;
    const existente = porTmdb.get(clave);
    if (existente && !extra) {
      await marcar(existente, { en_mi_lista: true });
      avisar(`“${existente.titulo}” está en tu lista.`);
      return;
    }
    const id = await db.agregarAMiLista(r, extra);
    const peli = await db.cargarPelicula(id);
    setCatalogo(c => (c.some(p => p.id === id) ? c : [...c, peli]));
    setMarcas(m => ({
      ...m,
      [id]: {
        ...(m[id] || { pelicula_id: id, visto: false, puntaje: 0, visto_at: null }),
        en_mi_lista: true,
        visto: Boolean(m[id]?.visto || extra?.visto),
        puntaje: Math.max(m[id]?.puntaje || 0, extra?.puntaje || 0),
        agregado_at: m[id]?.agregado_at || new Date().toISOString(),
      },
    }));
    return peli;
  }

  async function agregarDesdeBusqueda(r) {
    try {
      const peli = await sumarDeTmdb(r);
      if (peli) avisar(`Agregada a tu lista: ${peli.titulo}`);
      elegirSeccion("mia");
    } catch (e) {
      avisar(`No se pudo agregar: ${e.message}`);
    }
  }

  async function importarListaVieja(items, alTerminar) {
    let ok = 0;
    for (const it of items) {
      try {
        await db.agregarAMiLista(
          { ...it, media_type: it.media_type === "tv" ? "tv" : "movie" },
          { visto: Boolean(it.watched), puntaje: it.rating || 0 },
        );
        ok++;
      } catch { /* sigue con el resto */ }
    }
    guardar(LISTA_VIEJA_IMPORTADA, "1");
    await recargar();
    avisar(`Importé ${ok} de ${items.length} títulos.`);
    alTerminar();
  }

  function corregida(peli) {
    setCatalogo(c => c.map(p => (p.id === peli.id ? peli : p)));
    avisar("Listo, corregida.");
  }

  async function salir() {
    await supabase.auth.signOut();
  }

  const libro = useMemo(() => catalogo.filter(p => p.listas.includes("1001"))
    .sort((a, b) => (a.pagina_libro ?? 9999) - (b.pagina_libro ?? 9999) || a.id - b.id), [catalogo]);
  const argentino = useMemo(() => catalogo.filter(p => p.listas.includes("cine_argentino"))
    .sort((a, b) => (a.anio ?? 0) - (b.anio ?? 0)), [catalogo]);
  const miLista = useMemo(() => catalogo.filter(p => marcas[p.id]?.en_mi_lista)
    .sort((a, b) => (marcas[b.id].agregado_at || "").localeCompare(marcas[a.id].agregado_at || "")), [catalogo, marcas]);

  const cerrarDetalle = useCallback(() => setAbiertaId(null), []);
  const conteo = { "1001": libro.length, argentino: argentino.length, mia: miLista.length };
  const abierta = abiertaId != null ? catalogo.find(p => p.id === abiertaId) : null;
  const props = { marcas, admin, onAbrir: p => setAbiertaId(p.id), onMarcar: marcar };

  return (
    <>
      <header className="header">
        <div className="header-fila">
          <div className="logo">🎬<span className="ocultar-celu"> CINETRACKER</span></div>
          <Buscador placeholder="Sumar película o serie…" onElegir={agregarDesdeBusqueda}
            etiquetaDe={r => {
              const p = porTmdb.get(`${r.media_type === "tv" ? "tv" : "movie"}-${r.id}`);
              if (!p) return null;
              if (marcas[p.id]?.en_mi_lista) return "EN TU LISTA";
              if (p.listas.includes("1001")) return "EN LAS 1001";
              if (p.listas.includes("cine_argentino")) return "CINE ARG.";
              return null;
            }} />
          <button className="boton fantasma chico usuario" onClick={salir} title={usuario.email}>SALIR</button>
        </div>
        <nav className="tabs" role="tablist">
          {SECCIONES.map(s => (
            <button key={s.id} role="tab" className="tab" aria-selected={seccion === s.id} onClick={() => elegirSeccion(s.id)}>
              {s.titulo}<span className="num">{conteo[s.id] || ""}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="contenido">
        {cargando ? (
          <div className="vacio-grande">CARGANDO…</div>
        ) : error ? (
          <div className="banner"><span>No pude cargar los datos: {error}</span><button className="boton chico" onClick={recargar}>REINTENTAR</button></div>
        ) : seccion === "1001" ? (
          <Seccion1001 pelis={libro} {...props} />
        ) : seccion === "argentino" ? (
          <SeccionArgentino pelis={argentino} {...props} />
        ) : (
          <SeccionMiLista pelis={miLista} onImportar={importarListaVieja} {...props} />
        )}
      </main>

      {abierta && (
        <Detalle peli={abierta} marca={marcas[abierta.id]} admin={admin}
          onCerrar={cerrarDetalle} onMarcar={marcar} onCorregida={corregida} />
      )}
      {aviso && <div className="aviso" role="status">{aviso}</div>}
    </>
  );
}

// ── Piezas compartidas ──────────────────────────────────────────────────────

function Progreso({ vistas, total, texto }) {
  const pct = total ? Math.round((vistas / total) * 100) : 0;
  return (
    <div className="progreso">
      <div className="linea">
        <div className="grande"><b>{vistas}</b> DE {total} {texto}</div>
        <div className="chico">{pct}%</div>
      </div>
      <div className="barra"><div style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

function Chips({ opciones, valor, onCambiar }) {
  return (
    <div className="filtros">
      {opciones.map(o => (
        <button key={o.id} className={`chip ${o.clase || ""}`} aria-pressed={valor === o.id} onClick={() => onCambiar(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function filtrarEstado(pelis, marcas, estado) {
  return pelis.filter(p => {
    const m = marcas[p.id];
    if (estado === "porver") return !m?.visto;
    if (estado === "vistas") return m?.visto;
    if (estado === "calificadas") return m?.puntaje > 0;
    if (estado === "clasicos") return p.listas.includes("clasicos");
    if (estado === "revisar") return p.cruce !== "segura";
    if (estado === "peliculas") return p.media_type !== "tv";
    if (estado === "series") return p.media_type === "tv";
    return true;
  });
}

function Grilla({ pelis, marcas, admin, onAbrir, onMarcar, numerar }) {
  if (!pelis.length) return <div className="vacio-grande">NO HAY TÍTULOS ACÁ</div>;
  return (
    <div className="grilla">
      {pelis.map(p => (
        <Tarjeta key={p.id} peli={p} marca={marcas[p.id]} numero={numerar?.get(p.id)}
          mostrarDuda={admin} onAbrir={onAbrir} onMarcar={onMarcar} />
      ))}
    </div>
  );
}

// ── Secciones ───────────────────────────────────────────────────────────────

function Seccion1001({ pelis, marcas, admin, onAbrir, onMarcar }) {
  const [estado, setEstado] = useState("todas");
  const [texto, setTexto] = useState("");
  const [decada, setDecada] = useState("");

  const numeros = useMemo(() => new Map(pelis.map((p, i) => [p.id, i + 1])), [pelis]);
  const vistas = pelis.filter(p => marcas[p.id]?.visto).length;
  const aRevisar = pelis.filter(p => p.cruce !== "segura").length;
  const decadas = useMemo(() => [...new Set(pelis.map(p => p.anio && Math.floor(p.anio / 10) * 10).filter(Boolean))].sort(), [pelis]);

  const q = normalizar(texto.trim());
  const visibles = filtrarEstado(pelis, marcas, estado).filter(p =>
    (!decada || (p.anio && Math.floor(p.anio / 10) * 10 === Number(decada))) &&
    (!q || [p.titulo, p.titulo_tmdb, p.titulo_original, p.direccion].some(t => normalizar(t).includes(q))));

  const opciones = [
    { id: "todas", label: "TODAS" }, { id: "porver", label: "POR VER" }, { id: "vistas", label: "VISTAS" },
    { id: "calificadas", label: "CALIFICADAS" }, { id: "clasicos", label: "CLÁSICOS" },
    ...(admin && aRevisar ? [{ id: "revisar", label: `PARA REVISAR (${aRevisar})`, clase: "revisar" }] : []),
  ];

  return (
    <>
      <Progreso vistas={vistas} total={pelis.length} texto="VISTAS" />
      <Chips opciones={opciones} valor={estado} onCambiar={setEstado} />
      <div className="fila-filtros">
        <input className="campo" type="search" placeholder="Filtrar por título o director…" value={texto} onChange={e => setTexto(e.target.value)} />
        <select className="campo" value={decada} onChange={e => setDecada(e.target.value)} aria-label="Década">
          <option value="">Década</option>
          {decadas.map(d => <option key={d} value={d}>{d}s</option>)}
        </select>
      </div>
      <Grilla pelis={visibles} marcas={marcas} admin={admin} onAbrir={onAbrir} onMarcar={onMarcar} numerar={numeros} />
    </>
  );
}

// La sección se lee como un libro: nueve capítulos con su texto y, al final de cada uno,
// sus películas para marcar como vistas.
function SeccionArgentino({ pelis, marcas, onAbrir, onMarcar }) {
  const [estado, setEstado] = useState("todas");
  const porTitulo = useMemo(() => new Map(pelis.map(p => [p.titulo, p])), [pelis]);
  const vistas = pelis.filter(p => marcas[p.id]?.visto).length;
  const visibles = new Set(filtrarEstado(pelis, marcas, estado).map(p => p.id));

  function irA(id) {
    document.getElementById(`cap-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="historia">
      <header className="historia-cabeza">
        <h1>Historia del cine argentino</h1>
        <p className="bajada">Del cine mudo a hoy: directores, actores y películas para aprender.</p>
      </header>
      <Progreso vistas={vistas} total={pelis.length} texto="VISTAS" />

      <nav className="linea-tiempo" aria-label="Capítulos">
        {CAPITULOS.map(c => {
          const suyas = c.peliculas.map(t => porTitulo.get(t)).filter(Boolean);
          const hechas = suyas.filter(p => marcas[p.id]?.visto).length;
          return (
            <button key={c.id} type="button" onClick={() => irA(c.id)}
              style={{ flexGrow: c.hasta - c.desde }} title={`${c.numero}. ${c.titulo}`}
              className={suyas.length && hechas === suyas.length ? "completo" : ""}>
              <span className="num">{c.numero}</span>
              <span className="anios">{c.desde}</span>
            </button>
          );
        })}
      </nav>

      <div className="historia-texto"><TextoMd texto={HISTORIA_INTRO} /></div>

      <Chips opciones={[{ id: "todas", label: "TODAS" }, { id: "porver", label: "POR VER" }, { id: "vistas", label: "VISTAS" }]}
        valor={estado} onCambiar={setEstado} />

      {CAPITULOS.map(c => {
        const suyas = c.peliculas.map(t => porTitulo.get(t)).filter(Boolean);
        const mostrar = suyas.filter(p => visibles.has(p.id));
        const hechas = suyas.filter(p => marcas[p.id]?.visto).length;
        return (
          <section key={c.id} id={`cap-${c.id}`} className="capitulo">
            <h2>
              <span className="cap-num">{c.numero}</span>
              {c.titulo}
              <small>{c.desde}–{c.hasta}</small>
            </h2>
            <div className="historia-texto"><TextoMd texto={c.texto} /></div>
            {suyas.length > 0 && (
              <>
                <div className="para-ver">
                  <span>PARA VER</span>
                  <span className="cuenta">{hechas}/{suyas.length} vistas</span>
                </div>
                {mostrar.length > 0 ? (
                  <div className="lista-arg">
                    {mostrar.map(p => (
                      <FilaArgentina key={p.id} peli={p} marca={marcas[p.id]} onAbrir={onAbrir} onMarcar={onMarcar} />
                    ))}
                  </div>
                ) : (
                  <p className="nada">{estado === "porver" ? "Ya viste todas las de este capítulo." : "Todavía no viste ninguna de este capítulo."}</p>
                )}
              </>
            )}
          </section>
        );
      })}

      <section className="capitulo">
        <div className="historia-texto"><TextoMd texto={HISTORIA_CIERRE} /></div>
        <div className="historia-texto fuentes"><TextoMd texto={HISTORIA_FUENTES} /></div>
      </section>
    </div>
  );
}

// En cine argentino cada película se lee como una entrada del recorrido: afiche, datos y por qué verla.
function FilaArgentina({ peli, marca, onAbrir, onMarcar }) {
  const vista = Boolean(marca?.visto);
  return (
    <article className={`fila-arg${vista ? " vista" : ""}`} onClick={() => onAbrir(peli)}>
      <div className="afiche">
        {peli.poster_path
          ? <img src={`${IMG}w185${peli.poster_path}`} alt="" loading="lazy" decoding="async" />
          : <span>{peli.titulo}</span>}
      </div>
      <div className="texto">
        <h3>{peli.titulo} <small>{peli.anio}</small></h3>
        {peli.direccion && <div className="dire">{peli.direccion}</div>}
        {QUE_APRENDES[peli.titulo] && <div className="aprendes">{QUE_APRENDES[peli.titulo]}</div>}
        <p>{POR_QUE_VERLA[peli.titulo] || peli.sinopsis}</p>
        {vista && <Estrellas valor={marca.puntaje} tamano={16} onCambiar={v => onMarcar(peli, { puntaje: v })} />}
      </div>
      <button type="button" className="check" aria-pressed={vista}
        aria-label={vista ? `Desmarcar ${peli.titulo} como vista` : `Marcar ${peli.titulo} como vista`}
        onClick={e => { e.stopPropagation(); onMarcar(peli, { visto: !vista }); }}>
        ✓
      </button>
    </article>
  );
}

function SeccionMiLista({ pelis, marcas, admin, onAbrir, onMarcar, onImportar }) {
  const [estado, setEstado] = useState("todas");
  const [vieja, setVieja] = useState(listaVieja);
  const [importando, setImportando] = useState(false);
  const vistas = pelis.filter(p => marcas[p.id]?.visto).length;

  return (
    <>
      {vieja.length > 0 && (
        <div className="banner">
          <span>Encontré {vieja.length} títulos guardados en este navegador de la versión anterior.</span>
          <button className="boton oro chico" disabled={importando}
            onClick={() => { setImportando(true); onImportar(vieja, () => { setVieja([]); setImportando(false); }); }}>
            {importando ? "IMPORTANDO…" : "IMPORTAR MI LISTA ANTERIOR"}
          </button>
        </div>
      )}
      {pelis.length === 0 ? (
        <div className="vacio-grande">BUSCÁ UNA PELÍCULA O SERIE ARRIBA<br />PARA SUMARLA A TU LISTA</div>
      ) : (
        <>
          <Progreso vistas={vistas} total={pelis.length} texto="VISTAS" />
          <Chips valor={estado} onCambiar={setEstado} opciones={[
            { id: "todas", label: "TODAS" }, { id: "porver", label: "POR VER" }, { id: "vistas", label: "VISTAS" },
            { id: "calificadas", label: "CALIFICADAS" }, { id: "peliculas", label: "PELÍCULAS" }, { id: "series", label: "SERIES" },
          ]} />
          <Grilla pelis={filtrarEstado(pelis, marcas, estado)} marcas={marcas} admin={admin} onAbrir={onAbrir} onMarcar={onMarcar} />
        </>
      )}
    </>
  );
}
