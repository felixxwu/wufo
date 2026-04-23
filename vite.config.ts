import { defineConfig, type Connect } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'interactive-song-routes',
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, _res, next) => {
          if (req.url && /^\/interactive\/[^/]+\/?$/.test(req.url)) {
            req.url = '/interactive.html'
          }
          next()
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        interactive: 'interactive.html',
        knob: 'interactive.html',
      },
    },
  },
})
