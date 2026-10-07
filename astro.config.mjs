// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ───────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DE PUBLICAÇÃO
// ───────────────────────────────────────────────────────────────────────────
// Enquanto o site roda no endereço do GitHub Pages (ex.:
//   https://equipeavanco.github.io/equipeavanco-site/ )
// mantenha SITE e BASE abaixo como estão.
//
// Quando ligar o domínio próprio (equipeavanco.com.br), troque para:
//   const SITE = 'https://equipeavanco.com.br';
//   const BASE = '/';
// e faça um novo commit. Só isso.
// ───────────────────────────────────────────────────────────────────────────
const SITE = 'https://equipeavanco.github.io';
const BASE = '/equipeavanco-site';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
