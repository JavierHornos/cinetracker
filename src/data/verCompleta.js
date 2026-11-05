import { AGN_GLUCKSMANN } from "./agn";

// Películas que se pueden ver completas dentro de la página. Clave: "movie-<id TMDB>".
// Hoy son copias de Wikimedia Commons (dominio público o CC BY); cuando estén en el canal
// "Cine Club El Doctor" se puede cambiar por { youtube: "<id del video>", ... }.
// También acepta { archive: "<identificador en archive.org>" }.

export const VER_COMPLETA = {
  // Dominio público (Glücksmann murió en 1946): copia subida a YouTube por el canal CRFA | Cine Mudo.
  "movie-1792467": {
    youtube: "VpU5vEMfehc",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 1906",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=VpU5vEMfehc" },
  },
  // Dominio público (Glücksmann murió en 1946): copia subida a YouTube por el canal CRFA | Cine Mudo
  // (fuente que citan: Pangea Unidad Documental / Archivo Oscar Ceballos).
  "movie-1792455": {
    youtube: "oFd9XZcUvss",
    licencia: "Dominio público",
    credito: "Casa Lepage / Max Glücksmann (atribuido) · Jorge Newbery y Aarón de Anchorena, 1907-1908",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=oFd9XZcUvss" },
  },
  // Copias oficiales en YouTube, subidas por los propios archivos: se pueden embeber.
  "movie-1777537": {
    youtube: "qNYIbp_LKb0",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Casa Lepage · Mar del Plata (el AGN la fecha en 1909: «Rescate en Mar del Plata»)",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=qNYIbp_LKb0" },
  },
  "movie-1792511": {
    youtube: "e_nKRvMX_ek",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann · Buenos Aires, 1910",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=e_nKRvMX_ek" },
  },
  "movie-1796074": {
    youtube: "gjUL-0nOXzs",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann · tambor 897 (el AGN la sube como «Niños aprendiendo la señal de la cruz», c. 1910)",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=gjUL-0nOXzs" },
  },
  "movie-1796082": {
    youtube: "x2F_ZihQ13E",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann · Roque Sáenz Peña recorre el Hotel de Inmigrantes",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=x2F_ZihQ13E" },
  },
  "movie-1792447": {
    youtube: "7xrtfgoIwvE",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann · 1908",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=7xrtfgoIwvE" },
  },
  "movie-604648": {
    youtube: "XKmJhRuqbbA",
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Max Glücksmann · 15 de noviembre de 1901",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: "https://www.youtube.com/watch?v=XKmJhRuqbbA" },
  },
  "movie-804854": {
    youtube: "UXKQ5uQwc8g",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)",
    credito: "Elecciones argentinas 1910-11",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=UXKQ5uQwc8g" },
  },
  "movie-584726": {
    youtube: "-PfvK3hY1tM",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken",
    credito: "Una serpiente inofensiva. La culebra (1914)",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=-PfvK3hY1tM" },
  },
  "movie-719504": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/f/fa/La_bandera_Argentina_%281897%29.webm",
    licencia: "Dominio público",
    credito: "Eugenio Py · el fragmento que sobrevivió en un flipbook, repetido en loop",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:La_bandera_Argentina_(1897).webm" },
  },
  "movie-234260": {
    archive: "perdon-viejita-1927",
    licencia: "Obra de dominio público (Ferreyra murió en 1943)",
    credito: "José A. Ferreyra",
    fuente: { nombre: "Internet Archive", url: "https://archive.org/details/perdon-viejita-1927" },
  },
  "movie-160": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Arrival_of_a_Train_at_La_Ciotat_%28The_Lumi%C3%A8re_Brothers%2C_1895%29.webm",
    mov: "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1a/Arrival_of_a_Train_at_La_Ciotat_%28The_Lumi%C3%A8re_Brothers%2C_1895%29.webm/Arrival_of_a_Train_at_La_Ciotat_%28The_Lumi%C3%A8re_Brothers%2C_1895%29.webm.360p.mpeg4.mov",
    licencia: "Dominio público",
    credito: "Hermanos Lumière",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Arrival_of_a_Train_at_La_Ciotat_(The_Lumi%C3%A8re_Brothers,_1895).webm" },
  },
  "movie-233020": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/La_revoluci%C3%B3n_de_mayo_%28Mario_Gallo%2C_1909%29.ogv/La_revoluci%C3%B3n_de_mayo_%28Mario_Gallo%2C_1909%29.ogv.240p.vp9.webm",
    mov: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/La_revoluci%C3%B3n_de_mayo_%28Mario_Gallo%2C_1909%29.ogv/La_revoluci%C3%B3n_de_mayo_%28Mario_Gallo%2C_1909%29.ogv.360p.mpeg4.mov",
    licencia: "Dominio público",
    credito: "Mario Gallo",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:La_revoluci%C3%B3n_de_mayo_(Mario_Gallo,_1909).ogv" },
  },
  "movie-226934": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/4/43/Nitrato_argentino_-_Amalia_%281914%29.webm",
    mov: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/43/Nitrato_argentino_-_Amalia_%281914%29.webm/Nitrato_argentino_-_Amalia_%281914%29.webm.360p.mpeg4.mov",
    licencia: "CC BY 3.0",
    credito: "Restauración: Museo del Cine Pablo Ducrós Hicken (Nitrato argentino)",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Nitrato_argentino_-_Amalia_(1914).webm" },
  },
  "movie-285525": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/88/Nobleza_Gaucha_%281915%29_.webm/Nobleza_Gaucha_%281915%29_.webm.480p.vp9.webm",
    mov: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/88/Nobleza_Gaucha_%281915%29_.webm/Nobleza_Gaucha_%281915%29_.webm.360p.mpeg4.mov",
    licencia: "Dominio público",
    credito: "Humberto Cairo, Eduardo Martínez de la Pera y Ernesto Gunche",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Nobleza_Gaucha_(1915)_.webm" },
  },
  "movie-775": {
    webm: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Le_Voyage_dans_la_Lune_%281902%29.webm/Le_Voyage_dans_la_Lune_%281902%29.webm.480p.vp9.webm",
    mov: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Le_Voyage_dans_la_Lune_%281902%29.webm/Le_Voyage_dans_la_Lune_%281902%29.webm.360p.mpeg4.mov",
    licencia: "Dominio público",
    credito: "Georges Méliès",
    fuente: { nombre: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Le_Voyage_dans_la_Lune_(1902).webm" },
  },
  // La colección Glücksmann del AGN que TMDB no tiene (src/data/agn.js).
  ...Object.fromEntries(AGN_GLUCKSMANN.map(p => [`movie-${p.tmdb}`, {
    youtube: p.youtube,
    licencia: "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann",
    fuente: { nombre: "Archivo General de la Nación (YouTube)", url: `https://www.youtube.com/watch?v=${p.youtube}` },
  }])),
};

// Las del capítulo 1 (el cine mudo), en orden. Las que no están en VER_COMPLETA se ven con un link afuera.
export const MUDAS_COMPLETAS = [160, 719504, 233020, 226934, 285525, 234260, 253766];
