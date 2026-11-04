import { useEffect, useRef, useState } from "react";
import { IMG, anioDe, detalles, direccionDe, dondeVerDe, personaBreve, tituloDe } from "../lib/tmdb";
import { FICHAS } from "../data/personas";
import { BIOS } from "../data/bios";
import { LINKS, NOMBRES } from "../data/dondeVer";
import { VER_COMPLETA } from "../data/verCompleta";

// Vista previa de los links internos de los textos (personas y películas), como en Wikipedia:
// en la compu aparece al apoyar el mouse; en el celular, al tocar el link (y desde ahí se entra).

const DEMORA = 450; // ms con el mouse quieto antes de mostrarla
const ROL = { Directing: "Dirección", Camera: "Fotografía", Editing: "Montaje", Acting: "Actuación", Writing: "Guion" };

const cache = new Map();
function una(clave, fn) {
  if (!cache.has(clave)) cache.set(clave, fn().catch(e => { cache.delete(clave); throw e; }));
  return cache.get(clave);
}

function destinoDe(href) {
  let m = href.match(/^#\/persona\/(\d+)$/);
  if (m) return { tipo: "persona", id: Number(m[1]) };
  m = href.match(/^#\/tmdb\/(movie|tv)\/(\d+)$/);
  if (m) return { tipo: "peli", media: m[1], id: Number(m[2]) };
  m = href.match(/^#\/pelicula\/(\d+)$/);
  if (m) return { tipo: "catalogo", id: Number(m[1]) };
  return null;
}

// Primera oración, sin marcas de markdown y sin pasarse de largo.
function resumen(texto = "") {
  const limpio = texto.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*#]/g, "").replace(/\s+/g, " ").trim();
  const corte = limpio.slice(40).search(/[.!?] /);
  const frase = corte >= 0 ? limpio.slice(0, 40 + corte + 1) : limpio;
  return frase.length > 260 ? `${frase.slice(0, 257).replace(/\s\S*$/, "")}…` : frase;
}

async function datosPersona(id) {
  const d = await una(`persona-${id}`, () => personaBreve(id));
  const propia = FICHAS[id];
  const vida = [d.birthday, d.deathday].map(f => f?.slice(0, 4)).filter(Boolean).join("–");
  return {
    redonda: true,
    foto: d.profile_path,
    titulo: propia?.nombre || d.name,
    sub: [propia?.rol || ROL[d.known_for_department], vida].filter(Boolean).join(" · "),
    texto: propia?.bajada || resumen(BIOS[id]?.texto || d.biography),
    ir: "Ver ficha",
  };
}

async function datosPeli(media, id) {
  const d = await una(`${media}-${id}`, () => detalles(id, media));
  const clave = `${media}-${id}`;
  const plataformas = dondeVerDe(d).grupos.flatMap(g => g.plataformas.map(p => NOMBRES[p.provider_name] || p.provider_name));
  const donde = [...new Set([
    ...(VER_COMPLETA[clave] ? ["completa en la página"] : []),
    ...(LINKS[clave] || []).map(l => l.nombre),
    ...plataformas,
  ])].slice(0, 3);
  return {
    foto: d.poster_path,
    titulo: tituloDe(d),
    sub: [anioDe(d), direccionDe(d, media)].filter(Boolean).join(" · "),
    texto: resumen(d.overview),
    donde,
    ir: "Ver película",
  };
}

function obtener(dest, catalogo) {
  if (dest.tipo === "persona") return datosPersona(dest.id);
  if (dest.tipo === "peli") return datosPeli(dest.media, dest.id);
  const p = catalogo.find(x => x.id === dest.id);
  if (!p) return Promise.reject(new Error("no está en el catálogo"));
  if (p.tmdb_id) return datosPeli(p.media_type === "tv" ? "tv" : "movie", p.tmdb_id);
  return Promise.resolve({
    foto: p.poster_path, titulo: p.titulo, sub: [p.anio, p.direccion].filter(Boolean).join(" · "),
    texto: resumen(p.sinopsis), donde: [], ir: "Ver película",
  });
}

const linkDe = e => e.target.closest?.(".historia-texto a[href^='#/']");

export default function VistaPrevia({ catalogo }) {
  const [tarjeta, setTarjeta] = useState(null); // { href, estilo, hoja, datos, error }
  const catalogoRef = useRef(catalogo);
  const salida = useRef();
  useEffect(() => { catalogoRef.current = catalogo; });

  useEffect(() => {
    const tactil = window.matchMedia("(hover: none)").matches;
    let entrada;
    let actual = null;

    const abrir = a => {
      const href = a.getAttribute("href");
      const dest = destinoDe(href);
      if (!dest) return false;
      let estilo = {};
      if (!tactil) {
        const r = a.getBoundingClientRect();
        const left = Math.max(8, Math.min(r.left, window.innerWidth - 348));
        estilo = r.bottom + 280 > window.innerHeight
          ? { left, bottom: window.innerHeight - r.top + 8 }
          : { left, top: r.bottom + 8 };
      }
      setTarjeta({ href, estilo, hoja: tactil, datos: null });
      obtener(dest, catalogoRef.current)
        .then(datos => setTarjeta(t => (t?.href === href ? { ...t, datos } : t)))
        .catch(() => setTarjeta(t => (t?.href === href ? { ...t, error: true } : t)));
      return true;
    };
    const cerrar = () => { clearTimeout(entrada); actual = null; setTarjeta(null); };
    const tecla = e => { if (e.key === "Escape") cerrar(); };
    window.addEventListener("hashchange", cerrar);
    window.addEventListener("keydown", tecla);

    if (tactil) {
      // En el celular, tocar el link muestra la vista previa en vez de navegar.
      const toque = e => {
        const a = linkDe(e);
        if (a && destinoDe(a.getAttribute("href"))) { e.preventDefault(); abrir(a); }
      };
      document.addEventListener("click", toque, true);
      return () => {
        document.removeEventListener("click", toque, true);
        window.removeEventListener("hashchange", cerrar);
        window.removeEventListener("keydown", tecla);
      };
    }

    const encima = e => {
      const a = linkDe(e);
      if (!a || a === actual) return;
      actual = a;
      clearTimeout(salida.current);
      clearTimeout(entrada);
      entrada = setTimeout(() => abrir(a), DEMORA);
    };
    const afuera = e => {
      const a = linkDe(e);
      if (!a || a.contains(e.relatedTarget)) return;
      actual = null;
      clearTimeout(entrada);
      salida.current = setTimeout(() => setTarjeta(null), 250);
    };
    document.addEventListener("mouseover", encima);
    document.addEventListener("mouseout", afuera);
    document.addEventListener("click", cerrar);
    window.addEventListener("scroll", cerrar, { passive: true });
    return () => {
      clearTimeout(entrada);
      document.removeEventListener("mouseover", encima);
      document.removeEventListener("mouseout", afuera);
      document.removeEventListener("click", cerrar);
      window.removeEventListener("scroll", cerrar);
      window.removeEventListener("hashchange", cerrar);
      window.removeEventListener("keydown", tecla);
    };
  }, []);

  if (!tarjeta) return null;
  const { datos, error, hoja } = tarjeta;
  const cuerpo = (
    <div
      className={`vista-previa${hoja ? " hoja" : ""}`}
      style={tarjeta.estilo}
      role="dialog"
      aria-label={datos?.titulo || "Vista previa"}
      onMouseEnter={() => clearTimeout(salida.current)}
      onMouseLeave={() => { if (!hoja) salida.current = setTimeout(() => setTarjeta(null), 250); }}
    >
      {error ? (
        <p className="vp-texto">No pude cargar la vista previa.</p>
      ) : !datos ? (
        <p className="vp-texto vp-cargando">Cargando…</p>
      ) : (
        <>
          <div className="vp-cabeza">
            {datos.foto
              ? <img className={datos.redonda ? "redonda" : ""} src={`${IMG}w185${datos.foto}`} alt="" />
              : <span className={`vp-sin-foto${datos.redonda ? " redonda" : ""}`} />}
            <div>
              <div className="vp-titulo">{datos.titulo}</div>
              {datos.sub && <div className="vp-sub">{datos.sub}</div>}
            </div>
          </div>
          {datos.texto && <p className="vp-texto">{datos.texto}</p>}
          {datos.donde?.length > 0 && <div className="vp-donde">▶ Para ver: {datos.donde.join(" · ")}</div>}
        </>
      )}
      <a className="vp-ir" href={tarjeta.href} onClick={() => setTarjeta(null)}>
        {datos?.ir || "Abrir"} →
      </a>
    </div>
  );
  if (!hoja) return cuerpo;
  return (
    <>
      <div className="vp-fondo" onClick={() => setTarjeta(null)} />
      {cuerpo}
    </>
  );
}
