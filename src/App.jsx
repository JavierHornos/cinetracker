import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigurado } from "./lib/supabase";
import * as db from "./lib/datos";
import { EPOCAS, epocaDe } from "./data/cineArgentino";
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

function SeccionArgentino({ pelis, marcas, admin, onAbrir, onMarcar }) {
  const [estado, setEstado] = useState("todas");
  const vistas = pelis.filter(p => marcas[p.id]?.visto).length;
  const visibles = filtrarEstado(pelis, marcas, estado);

  return (
    <>
      <Progreso vistas={vistas} total={pelis.length} texto="VISTAS" />
      <Chips opciones={[{ id: "todas", label: "TODAS" }, { id: "porver", label: "POR VER" }, { id: "vistas", label: "VISTAS" }]}
        valor={estado} onCambiar={setEstado} />
      {EPOCAS.map(ep => {
        const deEpoca = pelis.filter(p => epocaDe(p.anio).id === ep.id);
        const mostrar = visibles.filter(p => epocaDe(p.anio).id === ep.id);
        if (!deEpoca.length || !mostrar.length) return null;
        const vistasEp = deEpoca.filter(p => marcas[p.id]?.visto).length;
        return (
          <section key={ep.id} className="epoca">
            <h2>
              {ep.titulo}
              <small>{ep.desde}{ep.hasta < 2100 ? `–${ep.hasta}` : " en adelante"}</small>
              <span className="cuenta">{vistasEp}/{deEpoca.length}</span>
            </h2>
            <p>{ep.intro}</p>
            <Grilla pelis={mostrar} marcas={marcas} admin={admin} onAbrir={onAbrir} onMarcar={onMarcar} />
          </section>
        );
      })}
    </>
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
