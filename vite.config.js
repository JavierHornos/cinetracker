import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tmdbHandler from './netlify/functions/tmdb.mjs'

// En desarrollo sirve la Netlify Function de TMDB desde el mismo `npm run dev`,
// así no hace falta instalar netlify-cli.
function netlifyFunctionsDev() {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/tmdb', async (req, res) => {
        const response = await tmdbHandler(new Request(`http://localhost${req.originalUrl}`))
        res.statusCode = response.status
        response.headers.forEach((v, k) => res.setHeader(k, v))
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.TMDB_API_KEY ??= env.TMDB_API_KEY
  return {
    plugins: [react(), netlifyFunctionsDev()],
  }
})
