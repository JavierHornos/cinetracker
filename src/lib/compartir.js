// Comparte un link de la página: en el celu abre el menú nativo (WhatsApp, etc.); si no, lo copia.
// `ruta` es la dirección pública: /p/ID, /persona/ID o /historia (ver netlify/edge-functions/vista-previa.js).
export async function compartir(ruta, titulo) {
  const url = `${window.location.origin}${ruta}`;
  // Solo en pantallas táctiles: en la compu (Windows) el menú nativo es más incómodo que copiar.
  if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
    try {
      await navigator.share({ title: titulo, url });
      return null;
    } catch (e) {
      if (e.name === "AbortError") return null;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "Link copiado. Pegalo donde quieras.";
  } catch {
    window.prompt("Copiá este link:", url);
    return null;
  }
}
