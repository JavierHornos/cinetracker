// Markdown mínimo para los textos de la historia del cine argentino:
// ### subtítulo, - lista, 1. lista, | tabla | (primera fila = encabezado), **negrita**, *itálica*, [link](url).

function enLinea(texto, clave = "") {
  const partes = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let ultimo = 0;
  let m;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    const k = `${clave}-${m.index}`;
    if (m[1]) partes.push(<a key={k} href={m[2]} target="_blank" rel="noreferrer">{enLinea(m[1], k)}</a>);
    else if (m[3]) partes.push(<strong key={k}>{enLinea(m[3], k)}</strong>);
    else partes.push(<em key={k}>{enLinea(m[4], k)}</em>);
    ultimo = re.lastIndex;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

const celdas = fila => fila.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());

export default function TextoMd({ texto }) {
  return texto.trim().split(/\n\s*\n/).map((bloque, i) => {
    const lineas = bloque.split("\n");
    if (bloque.startsWith("### ")) return <h3 key={i}>{enLinea(bloque.slice(4), `h${i}`)}</h3>;
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
