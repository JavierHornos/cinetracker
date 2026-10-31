import { useState } from "react";

export default function Estrellas({ valor = 0, onCambiar, tamano = 18 }) {
  const [hover, setHover] = useState(0);
  const mostrar = hover || valor;
  return (
    <div className="estrellas" onMouseLeave={() => setHover(0)} onClick={e => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map(n => {
        const llena = n <= mostrar;
        return (
          <button key={n} type="button" aria-label={`${n} de 5`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onCambiar(valor === n ? 0 : n)}>
            <svg width={tamano} height={tamano} viewBox="0 0 24 24"
              style={{ filter: llena ? "drop-shadow(0 0 4px rgba(245,197,24,.8))" : "none" }}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={llena ? "#f5c518" : "none"} stroke={llena ? "#f5c518" : "#555"}
                strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
      {valor > 0 && <span className="valor" style={{ fontSize: tamano * 0.8 }}>{valor}/5</span>}
    </div>
  );
}
