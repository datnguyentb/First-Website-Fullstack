import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 1. Import plugin Tailwind mới nhất
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // 2. Thêm vào mảng plugins
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/components/GlobalStyles/index.scss" as *;`,
            },
        },
    },
    server: {
        host: true,
        port: 5173,
    },
});
