import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        vueJsx(),
        Components({
            resolvers: [NaiveUiResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
