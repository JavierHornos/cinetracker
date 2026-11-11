import { AGN_GLUCKSMANN } from "./agn";

// Películas que se pueden ver completas dentro de la página. Clave: "movie-<id TMDB>".
// Hoy son copias de Wikimedia Commons (dominio público o CC BY); cuando estén en el canal
// "Cine Club El Doctor" se puede cambiar por { youtube: "<id del video>", ... }.
// También acepta { archive: "<identificador en archive.org>" }.

export const VER_COMPLETA = {
  // Canal CRFA | Cine Mudo: películas de dominio público (sus directores murieron hace más de 50 años).
  "movie-1796085": {
    youtube: "Mgi6WyNamVw",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 30 de abril de 1911",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=Mgi6WyNamVw" },
  },
  "movie-1796094": {
    youtube: "39YJSlxegu4",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 17 de octubre de 1911",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=39YJSlxegu4" },
  },
  "movie-1796097": {
    youtube: "nKv7y1V2nwg",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 25 de diciembre de 1911",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=nKv7y1V2nwg" },
  },
  "movie-1796070": {
    youtube: "IWguV0aVnm0",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 1910",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=IWguV0aVnm0" },
  },
  "movie-1796050": {
    youtube: "aYvbQGQZIVE",
    licencia: "Dominio público",
    credito: "Max Glücksmann · mayo de 1910",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=aYvbQGQZIVE" },
  },
  "movie-1796066": {
    youtube: "wga0Cw0k3nY",
    licencia: "Dominio público",
    credito: "Max Glücksmann · mayo de 1910",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=wga0Cw0k3nY" },
  },
  "movie-1814295": {
    youtube: "uihR3K7YTpA",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 1931",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=uihR3K7YTpA" },
  },
  "movie-637469": {
    youtube: "D9uGnELihsE",
    licencia: "Dominio público",
    credito: "Max Glücksmann · 27 de marzo de 1913",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=D9uGnELihsE" },
  },
  "movie-488802": {
    youtube: "V07WVEsVTJg",
    licencia: "Dominio público",
    credito: "Mario Gallo y Max Glücksmann · 1909",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=V07WVEsVTJg" },
  },
  "movie-861377": {
    youtube: "O-cscgoxuJs",
    licencia: "Dominio público",
    credito: "Eugenio Py · 1900",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=O-cscgoxuJs" },
  },
  "movie-1792416": {
    youtube: "gyesiUxAWe4",
    licencia: "Dominio público",
    credito: "Eugenio Py · 1899",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=gyesiUxAWe4" },
  },
  "movie-231753": {
    youtube: "ByEEy25ZDuQ",
    licencia: "Dominio público",
    credito: "Eugenio Py · 25 de octubre de 1900",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=ByEEy25ZDuQ" },
  },
  "movie-470714": {
    youtube: "53ielcvBhH4",
    licencia: "Dominio público",
    credito: "Eugenio Py · 1899",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=53ielcvBhH4" },
  },
  "movie-861906": {
    youtube: "YSup99GUNNM",
    licencia: "Dominio público",
    credito: "Eugenio Cardini · el fragmento que se conserva",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=YSup99GUNNM" },
  },
  "movie-862174": {
    youtube: "vn2G8-cjIJQ",
    licencia: "Dominio público",
    credito: "Eugenio Cardini · el fragmento que se conserva",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=vn2G8-cjIJQ" },
  },
  "movie-1266034": {
    youtube: "Bu6n96pmOb4",
    licencia: "Dominio público",
    credito: "Eugenio Cardini · 1902",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=Bu6n96pmOb4" },
  },
  "movie-628916": {
    youtube: "S2Fu3st5hyI",
    licencia: "Dominio público",
    credito: "Eugenio Cardini · 1901",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=S2Fu3st5hyI" },
  },
  "movie-1266028": {
    youtube: "j5WpPqAbmAU",
    licencia: "Dominio público",
    credito: "Eugenio Cardini · 1924",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=j5WpPqAbmAU" },
  },
  "movie-233019": {
    youtube: "j3mVweMEmpI",
    licencia: "Dominio público",
    credito: "Mario Gallo · 1909",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=j3mVweMEmpI" },
  },
  "movie-184880": {
    youtube: "4mcQU6OttAU",
    licencia: "Dominio público",
    credito: "José Agustín Ferreyra · 1926",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=4mcQU6OttAU" },
  },
  "movie-184277": {
    youtube: "qu8qwO6iHM4",
    licencia: "Dominio público",
    credito: "José Agustín Ferreyra · 21 de noviembre de 1922",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=qu8qwO6iHM4" },
  },
  "movie-1815578": {
    youtube: "AWIoCYs46DA",
    licencia: "Dominio público",
    credito: "Federico Valle · 1922",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=AWIoCYs46DA" },
  },
  "movie-911992": {
    youtube: "cwZPB6oekrU",
    licencia: "Dominio público",
    credito: "Federico Valle · 1928",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=cwZPB6oekrU" },
  },
  "movie-1768278": {
    youtube: "FuZRPxvTRYQ",
    licencia: "Dominio público",
    credito: "Federico Valle · 1927",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=FuZRPxvTRYQ" },
  },
  "movie-486147": {
    youtube: "7f1rHbmNasY",
    licencia: "Dominio público",
    credito: "Federico Valle · 1923",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=7f1rHbmNasY" },
  },
  "movie-486265": {
    youtube: "kHdHBupO9y8",
    licencia: "Dominio público",
    credito: "Ricardo Villarán · 27 de septiembre de 1925",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=kHdHBupO9y8" },
  },
  "movie-282193": {
    youtube: "Kjpp_NAixfc",
    licencia: "Dominio público",
    credito: "Julio Irigoyen · los fragmentos que se conservan",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=Kjpp_NAixfc" },
  },
  "movie-428628": {
    youtube: "rc9mQVpyH-8",
    licencia: "Dominio público",
    credito: "Nelo Cosimi · 4 de mayo de 1929",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=rc9mQVpyH-8" },
  },
  "movie-184276": {
    youtube: "mP9Hny-kzrA",
    licencia: "Dominio público",
    credito: "Nelo Cosimi · 1922",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=mP9Hny-kzrA" },
  },
  "movie-806228": {
    youtube: "hi0qosfZnnk",
    licencia: "Dominio público",
    credito: "Edmo Cominetti · 2 de octubre de 1929",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=hi0qosfZnnk" },
  },
  "movie-343434": {
    youtube: "AvbmWZD7d4Y",
    licencia: "Dominio público",
    credito: "Edmo Cominetti · 1928",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=AvbmWZD7d4Y" },
  },
  "movie-486631": {
    youtube: "LjQgTqj2Z7E",
    licencia: "Dominio público",
    credito: "Edmo Cominetti · 9 de septiembre de 1926",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=LjQgTqj2Z7E" },
  },
  "movie-1778584": {
    youtube: "4fdnP2C8cnk",
    licencia: "Dominio público",
    credito: "Carlo Campogalliani · el fragmento que se conserva",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=4fdnP2C8cnk" },
  },
  "movie-227457": {
    youtube: "8cr9QYaHg08",
    licencia: "Dominio público",
    credito: "Francisco Defilippis Novoa · 28 de septiembre de 1917",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=8cr9QYaHg08" },
  },
  "movie-174676": {
    youtube: "F2EHzX5Aq08",
    licencia: "Dominio público",
    credito: "Alcides Greca · 4 de abril de 1918",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=F2EHzX5Aq08" },
  },
  "movie-1814291": {
    youtube: "MOkvkKUH3Go",
    licencia: "Dominio público",
    credito: "Alberto María De Agostini · 1930",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=MOkvkKUH3Go" },
  },
  // Dominio público (Glücksmann murió en 1946): copia subida a YouTube por el canal CRFA | Cine Mudo.
  "movie-1792496": {
    youtube: "BXWoxWcPxv0",
    licencia: "Dominio público",
    credito: "Max Glücksmann · Gran Premio Hípico del Centenario, 22 de mayo de 1910",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=BXWoxWcPxv0" },
  },
  // Dominio público (Glücksmann murió en 1946): copia subida a YouTube por el canal CRFA | Cine Mudo.
  "movie-1792483": {
    youtube: "qs67V0WUyrU",
    licencia: "Dominio público",
    credito: "Max Glücksmann · Gran Revista Naval del Centenario, 21 de mayo de 1910",
    fuente: { nombre: "CRFA | Cine Mudo (YouTube)", url: "https://www.youtube.com/watch?v=qs67V0WUyrU" },
  },
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
  "movie-804366": {
    youtube: "t8RPac4UjcM",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)",
    credito: "Casa Lepage de Max Glücksmann · el mismo rollo que las bodas de plata de los Pirán",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=t8RPac4UjcM" },
  },
  "movie-486633": {
    youtube: "diVm-5c4Q8Q",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)",
    credito: "José Agustín Ferreyra, 1926 · lo que se conserva, restaurado por el Museo del Cine",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=diVm-5c4Q8Q" },
  },
  "movie-805117": {
    youtube: "91oYRUFCEMw",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)",
    credito: "Rapid Film, 1926",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=91oYRUFCEMw" },
  },
  "movie-804364": {
    youtube: "t8RPac4UjcM",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)",
    credito: "Max Glücksmann · Bodas de plata de Antonio N. Pirán y Emilia A. Moutier",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=t8RPac4UjcM" },
  },
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
    youtube: "0h3V4L5uRIE",
    licencia: "Copia oficial del Museo del Cine Pablo Ducrós Hicken",
    credito: "Pathé Frères, distribuida por la Casa Lepage de Max Glücksmann · restauración 2019",
    fuente: { nombre: "Museo del Cine (YouTube)", url: "https://www.youtube.com/watch?v=0h3V4L5uRIE" },
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
    licencia: p.museo ? "Copia oficial del Museo del Cine Pablo Ducrós Hicken (ciclo Nitrato argentino)" : "Copia oficial del Archivo General de la Nación",
    credito: "Colección Max Glücksmann",
    fuente: p.museo
      ? { nombre: "Museo del Cine (YouTube)", url: `https://www.youtube.com/watch?v=${p.youtube}` }
      : { nombre: "Archivo General de la Nación (YouTube)", url: `https://www.youtube.com/watch?v=${p.youtube}` },
  }])),
};

// Las del capítulo 1 (el cine mudo), en orden. Las que no están en VER_COMPLETA se ven con un link afuera.
export const MUDAS_COMPLETAS = [160, 719504, 233020, 226934, 285525, 234260, 253766];
