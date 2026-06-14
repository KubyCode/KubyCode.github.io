import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  // Al ser un repositorio de usuario (KubyCode.github.io), la base es la raíz absoluta '/'
  base: '/', 
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },
  build: {
    outDir: 'docs' // Excelente, esto le dice a Vite que compile todo dentro de la carpeta 'docs' que usas en GitHub
  }
})