// Artigos do blog (importados do site antigo para src/content/blog/*.json).
import { href } from './site';

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  author?: string;
  date: string;
  minutes?: number | null;
  cover?: string;
  coverAlt?: string;
  html: string;
};

const arquivos = import.meta.glob<Post>('../content/blog/*.json', { eager: true, import: 'default' });

/** Publicados (data até hoje), do mais recente para o mais antigo */
export const posts: Post[] = Object.values(arquivos)
  .filter((p) => p && p.slug && p.date && new Date(p.date) <= new Date())
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

/** Ajusta links e imagens locais ("/...") ao endereço base do site */
export const local = (u = '') => (u.startsWith('/') ? href(u) : u);
export const corrigirHtml = (html: string) =>
  html.replace(/(src|href)="\/(?!\/)/g, (_m, attr) => `${attr}="${href('/')}`.replace(/\/?$/, '/'));

export const dataBR = (d: string) =>
  new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' });
