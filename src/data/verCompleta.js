// Películas que se pueden ver completas dentro de la página. Clave: "movie-<id TMDB>".
// Hoy son copias de Wikimedia Commons (dominio público o CC BY); cuando estén en el canal
// "Cine Club El Doctor" se puede cambiar por { youtube: "<id del video>", ... }.

export const VER_COMPLETA = {
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
};

// Las que se ven completas en el capítulo 1 (el cine mudo), en orden.
export const MUDAS_COMPLETAS = [160, 233020, 226934, 285525];
