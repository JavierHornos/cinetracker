// Créditos que TMDB no tiene y sí figuran en cinenacional.com (chequeo del 4/11/2026).
// Se suman a los de TMDB en el equipo de cada película y en la filmografía de cada ficha.
// Cada persona va como [id de TMDB, nombre]; si no está en TMDB, el id es null y se muestra sin link.
// Solo se cargan agregados: donde TMDB y cinenacional no coinciden (Los tallos amargos) no se toca nada.
export const CREDITOS_EXTRA = {
  "movie-226934": { titulo: "Amalia", anio: 1914, foto: [[1266997, "Eugenio Py"]] },
  "movie-234260": { titulo: "Perdón, viejita", anio: 1927, foto: [[1920247, "Carlos Torres Ríos"]] },
  "movie-464326": { titulo: "Los tres berretines", anio: 1933, foto: [[96252, "John Alton"]] },
  "movie-453652": { titulo: "¡Tango!", anio: 1933, foto: [[1587860, "Antonio Merayo"]] },
  "movie-429445": { titulo: "Ayúdame a vivir", anio: 1936, foto: [[1788706, "Vicente Cosentino"]] },
  "movie-445447": { titulo: "Los muchachos de antes no usaban gomina", anio: 1937, foto: [[1411904, "Francisco Mugica"]] },
  "movie-403382": { titulo: "La rubia del camino", anio: 1938, foto: [[null, "Luis F. Romero"]] },
  "movie-427803": { titulo: "Mujeres que trabajan", anio: 1938, foto: [[1843482, "Luis Romero Carranza"]] },
  "movie-335369": { titulo: "Historia de una noche", anio: 1941, foto: [[2213681, "Roque Giacovino"]] },
  "movie-300427": { titulo: "La guerra gaucha", anio: 1942, foto: [[1380536, "Humberto Peruzzi"]] },
  "movie-290968": { titulo: "El ángel desnudo", anio: 1946, foto: [[1414707, "Aníbal González Paz"]], mont: [[null, "Oscar Rampoldi"]] },
  "movie-561736": { titulo: "A sangre fría", anio: 1947, foto: [[2410161, "Alberto Curchi"]] },
  "movie-499878": { titulo: "Pelota de trapo", anio: 1948, foto: [[1964205, "Álvaro Barreiro"], [1639921, "Gumer Barreiros"]] },
  "movie-318590": { titulo: "Deshonra", anio: 1952, foto: [[1725398, "Pedro Marzialetti"]], mont: [[1761149, "Nicolás Proserpio"]] },
  "movie-425114": { titulo: "Mercado de abasto", anio: 1955, foto: [[null, "Osvaldo Falabella"]] },
  "movie-199194": { titulo: "La casa del ángel", anio: 1957, foto: [[5043328, "Ricardo Agudo"]] },
  "movie-559762": { titulo: "La bestia humana", anio: 1957, foto: [[2410161, "Alberto Curchi"]] },
  "movie-151441": { titulo: "Tire dié", anio: 1960, foto: [[1131520, "Fernando Birri"]] },
  "movie-431881": { titulo: "Shunko", anio: 1960, foto: [[1788706, "Vicente Cosentino"]] },
  "movie-121461": { titulo: "La mano en la trampa", anio: 1961, foto: [[1143704, "Juan Julio Baena"]], mont: [[1304865, "Jacinto Cascales"]] },
  "movie-204192": { titulo: "Los inundados", anio: 1962, foto: [[2410161, "Alberto Curchi"]] },
  "movie-89681": { titulo: "La hora de los hornos", anio: 1968, mont: [[71353, "Fernando E. Solanas"]] },
  "movie-127467": { titulo: "Juan Moreira", anio: 1973, foto: [[995370, "Juan Carlos Desanzo"]] },
  "movie-226216": { titulo: "Los traidores", anio: 1973, foto: [[1456852, "Julio Lencina"], [3432229, "Rinaldo Arsenio Pica"]] },
  "movie-127449": { titulo: "La tregua", anio: 1974, foto: [[995370, "Juan Carlos Desanzo"]], mont: [[1070260, "Juan Carlos Macías"]] },
  "movie-62499": { titulo: "Boquitas pintadas", anio: 1974, foto: [[116203, "Aníbal Di Salvo"]] },
  "movie-246896": { titulo: "No habrá más penas ni olvido", anio: 1983, foto: [[2351756, "Eber Latour"]] },
  "movie-42085": { titulo: "Camila", anio: 1984, foto: [[33824, "Fernando Arribas"]] },
  "movie-193302": { titulo: "Los rubios", anio: 2003, foto: [[4298147, "Catalina Fernández"]] },
  "movie-714888": { titulo: "Argentina, 1985", anio: 2022, foto: [[2228865, "Manuel Rebella"]] },
};

// Qué rol de TMDB corresponde a cada clave.
export const JOB_EXTRA = { dir: "Director", foto: "Director of Photography", mont: "Editor" };

// Las películas que cinenacional le suma a una persona, con la forma de un crédito de TMDB.
export function creditosExtraDe(personaId) {
  return Object.entries(CREDITOS_EXTRA).flatMap(([clave, c]) => {
    const [media_type, id] = clave.split("-");
    return Object.entries(JOB_EXTRA)
      .filter(([k]) => (c[k] || []).some(([pid]) => pid === personaId))
      .map(([, job]) => ({
        id: Number(id), media_type, job, title: c.titulo, original_title: c.titulo,
        original_language: "es", release_date: `${c.anio}-01-01`, de_cinenacional: true,
      }));
  });
}
