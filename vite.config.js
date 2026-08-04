import { defineConfig } from 'vite';

// Rutas relativas para que el build funcione tanto en la raíz del dominio
// como en subdirectorios (por ejemplo, https://dominio.com/precios/).
export default defineConfig({
  base: './',
});
