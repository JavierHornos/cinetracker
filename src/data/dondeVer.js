// Links directos que TMDB no tiene (o no tiene completos). Clave: "movie-<id TMDB>" o "tv-<id TMDB>".
export const LINKS = {
  // No es de dominio público (Cristiani murió en 1984): link afuera, no embebida. Pedir permiso para embeberla.
  "movie-253766": [
    { nombre: "Internet Archive", url: "https://archive.org/details/mono-relojero-el-quirino-cristiani-arg-1938", nota: "copia subida por terceros · derechos: herederos de Quirino Cristiani" },
  ],
  // Los tres berretines (1933), de las 41 de la historia.
  "movie-464326": [
    { nombre: "Cine.ar", url: "https://play.cine.ar/INCAA/produccion/106", nota: "gratis con registro" },
  ],
  // La vida a oscuras (Enrique Bellande, 2023), sobre Fernando Martín Peña.
  "movie-1110671": [
    { nombre: "Cine.ar", url: "https://play.cine.ar/INCAA/produccion/9787", nota: "gratis con registro" },
  ],
  "movie-898015": [
    { nombre: "Cine.ar", url: "https://play.cine.ar/INCAA/produccion/7901", nota: "gratis con registro" },
  ],
  // Los tallos amargos (1956): no es de dominio público (Piazzolla murió en 1992). Copia restaurada subida por terceros.
  "movie-185250": [
    { nombre: "Internet Archive", url: "https://archive.org/details/los-tallos-amargos-the-bitter-stems-1956-eng-sub-restored-movie-720p-hd", nota: "copia restaurada subida por terceros, con la presentación de Eddie Muller (TCM) y subtítulos en inglés" },
  ],
  "movie-740542": [
    { nombre: "BAFILMA", url: "https://bafilma.gba.gob.ar/audiovisuales/largometrajes-peliculas/papelito", nota: "gratis con registro" },
  ],
};

// Cómo mostrar algunas plataformas de TMDB (que vienen con nombres en inglés o abreviados).
export const NOMBRES = { CINE: "Cine.ar" };
export const NOTAS = { CINE: "gratis con registro" };
