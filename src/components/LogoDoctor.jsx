// Logo de Cine Club El Doctor: el personaje de El Doctor Producciones Audiovisuales sobre un
// decorado torcido, como los de El gabinete del doctor Caligari (1920), y el nombre con letras
// que se inclinan cada una para su lado, como en los intertítulos de la película.

export function Insignia({ alto = 48 }) {
  return (
    <svg className="insignia-doctor" viewBox="0 0 80 100" height={alto} width={alto * 0.8} aria-hidden="true">
      <polygon points="7,9 77,0 80,93 0,100" fill="#e9dfc6" />
      <polygon points="44,0 77,0 80,38" fill="#bfae8b" />
      <polygon points="0,58 24,100 0,100" fill="#bfae8b" />
      <path d="M2 30 L30 18 M50 96 L79 70 M4 80 L18 64" stroke="#3a2e22" strokeWidth="1.4" opacity=".45" />
      <image href="/img/el-doctor.png" x="8" y="5" width="64" height="94" preserveAspectRatio="xMidYMax meet" />
    </svg>
  );
}

// Inclinación y desplazamiento de cada letra (fijos, para que no cambien en cada render).
const GIROS = [-7, 4, -3, 6, -5, 3, -6, 5, -2, 7, -4];
const SALTOS = [1, -2, 2, -1, 0, -2, 1, 2, -1, 0, 1];

export function Torcido({ texto }) {
  return [...texto].map((c, i) => (
    <span key={i} className="letra-torcida" style={{
      transform: `translateY(${SALTOS[i % SALTOS.length]}px) rotate(${GIROS[i % GIROS.length]}deg)`,
    }}>{c === " " ? " " : c}</span>
  ));
}

export function Nombre() {
  return (
    <span className="nombre-doctor">
      <small>Cine Club</small>
      <b aria-label="El Doctor"><Torcido texto="El Doctor" /></b>
    </span>
  );
}
