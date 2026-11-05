import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Los links para compartir tienen ruta real (/p/1, /persona/2, /historia) para que WhatsApp
// muestre la vista previa; acá se pasan a las rutas internas de la página.
const ruta = window.location.pathname
const internas = [
  [/^\/p\/(\d+)\/?$/, m => `/pelicula/${m[1]}`],
  [/^\/persona\/(\d+)\/?$/, m => `/persona/${m[1]}`],
  [/^\/historia\/?$/, () => '/seccion/argentino'],
]
for (const [re, interna] of internas) {
  const m = ruta.match(re)
  if (m) window.history.replaceState(null, '', `/#${interna(m)}`)
}
// El título de la vista previa ("Viaje a la Luna · Cine Club El Doctor") no tiene que quedar al navegar.
document.title = 'Cine Club El Doctor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)