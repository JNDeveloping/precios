import { defineConfig } from 'vite';

// La aplicación se publica específicamente bajo grupolosnietos.com.ar/precios/.
// Una base absoluta evita que los assets apunten a /assets o /src en el dominio.
export default defineConfig({
  base: '/precios/',
});
