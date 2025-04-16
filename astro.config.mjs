// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import 'dotenv/config';

import vue from '@astrojs/vue';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: "server",

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [vue()]
});