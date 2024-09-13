import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST || 'localhost',
      port: env.VITE_PORT_FRONTEND || 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',  // El servidor backend
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),  // Reemplaza '/api' al principio de la ruta
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
            });
          },
        },
      },
    },
  };
});

