// Markdown mínimo para los textos de la historia del cine argentino:
// ### subtítulo, - lista, 1. lista, | tabla | (primera fila = encabezado), **negrita**, *itálica*, [link](url),
// ![epígrafe](/img/foto.webp) sola en su párrafo para una foto con epígrafe,
// y !video[epígrafe](youtube:ID) para un video de YouTube embebido (solo de fuentes oficiales).
// Varios !video seguidos, uno por línea, forman una galería.
import { useState } from "react";

const RE_VIDEO = /^!video\[(.+)\]\(youtube:([\w-]+)\)$/;

// Video liviano: muestra la imagen de YouTube y carga el reproductor recién al tocarlo.
function Video({ id, titulo }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="video-marco">
      {play ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`} title={titulo}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" className="video-portada" onClick={() => setPlay(true)} aria-label={`Reproducir ${titulo}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="video-play" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}

const limpio = t => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*/g, "");

function enLinea(texto, clave = "") {
  const partes = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let ultimo = 0;
  let m;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    const k = `${clave}-${m.index}`;
    // Los links internos (#/persona/…) abren dentro de la página; los demás, en otra pestaña.
    if (m[1]) partes.push(m[2].startsWith("#")
      ? <a key={k} href={m[2]}>{enLinea(m[1], k)}</a>
      : <a key={k} href={m[2]} target="_blank" rel="noreferrer">{enLinea(m[1], k)}</a>);
    else if (m[3]) partes.push(<strong key={k}>{enLinea(m[3], k)}</strong>);
    else partes.push(<em key={k}>{enLinea(m[4], k)}</em>);
    ultimo = re.lastIndex;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

const celdas = fila => fila.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());

export default function TextoMd({ texto }) {
  // Un subtítulo (###) es siempre su propio bloque, aunque el párrafo siga en la línea de abajo.
  const bloques = texto.trim().replace(/^(### .*)\n(?!\s*\n)/gm, "$1\n\n").split(/\n\s*\n/);
  return bloques.map((bloque, i) => {
    const lineas = bloque.split("\n");
    if (bloque.startsWith("### ")) return <h3 key={i}>{enLinea(bloque.slice(4), `h${i}`)}</h3>;
    if (lineas.length > 1 && lineas.every(l => RE_VIDEO.test(l.trim()))) {
      return (
        <div key={i} className="videos-grilla">
          {lineas.map((l, j) => {
            const [, epigrafe, id] = l.trim().match(RE_VIDEO);
            return (
              <figure key={id} className="foto video">
                <Video id={id} titulo={limpio(epigrafe)} />
                <figcaption>{enLinea(epigrafe, `g${i}-${j}`)}</figcaption>
              </figure>
            );
          })}
        </div>
      );
    }
    const video = bloque.trim().match(RE_VIDEO);
    if (video) {
      return (
        <figure key={i} className="foto video">
          <Video id={video[2]} titulo={limpio(video[1])} />
          <figcaption>{enLinea(video[1], `v${i}`)}</figcaption>
        </figure>
      );
    }
    const foto = bloque.trim().match(/^!\[(.+)\]\((\S+)\)$/);
    if (foto) {
      return (
        <figure key={i} className="foto">
          <img src={foto[2]} alt="" loading="lazy" decoding="async" />
          <figcaption>{enLinea(foto[1], `f${i}`)}</figcaption>
        </figure>
      );
    }
    if (lineas.every(l => l.startsWith("- "))) {
      return <ul key={i}>{lineas.map((l, j) => <li key={j}>{enLinea(l.slice(2), `${i}-${j}`)}</li>)}</ul>;
    }
    if (lineas.every(l => /^\d+\. /.test(l))) {
      return <ol key={i}>{lineas.map((l, j) => <li key={j}>{enLinea(l.replace(/^\d+\. /, ""), `${i}-${j}`)}</li>)}</ol>;
    }
    if (lineas.every(l => l.startsWith("|"))) {
      const [cabeza, ...filas] = lineas.map(celdas);
      return (
        <div key={i} className="tabla-scroll">
          <table>
            <thead><tr>{cabeza.map((c, j) => <th key={j}>{enLinea(c)}</th>)}</tr></thead>
            <tbody>{filas.map((f, j) => <tr key={j}>{f.map((c, k) => <td key={k}>{enLinea(c, `${i}-${j}-${k}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    }
    return <p key={i}>{enLinea(bloque.replace(/\n/g, " "), `p${i}`)}</p>;
  });
}
