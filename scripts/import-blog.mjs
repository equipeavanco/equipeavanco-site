// Importa os artigos do blog do site antigo (equipeavanco.com.br, Hostinger)
// para src/content/blog/*.json e baixa as imagens para public/blog/.
// Roda pelo GitHub Actions (workflow "Importar blog"). Uso: node scripts/import-blog.mjs
import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const ORIGEM = 'https://equipeavanco.com.br';
const LISTA = `${ORIGEM}/bombeiros-civil-blog`;
const SITE_ID = 'm6LbEbRNXNTvwMkV';
const OUT_JSON = 'src/content/blog';
const OUT_IMG = 'public/blog';
const UA = 'Mozilla/5.0 (compatible; EquipeAvancoBlogImport/1.0)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, opts = {}, tentativas = 4) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA, ...(opts.headers || {}) } });
      if (r.ok) return r;
      if (r.status === 404) return null;
    } catch {}
    await sleep(1000 * (i + 1));
  }
  return null;
}

const decodeEntities = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// ── 1. Lista de artigos (dados embutidos na página do blog) ──────────────────
export function lerLista(html) {
  const t = decodeEntities(html);
  const partes = t.split('"type":[0,"blog"]').slice(1);
  const campo = (p, nome) => {
    const m = p.match(new RegExp(`"${nome}":\\[0,"((?:[^"\\\\]|\\\\.)*)"\\]`));
    return m ? JSON.parse(`"${m[1]}"`) : '';
  };
  const vistos = new Set();
  const posts = [];
  for (const raw of partes) {
    const p = raw.split('"type":[0,')[0];
    const slug = campo(p, 'slug');
    if (!slug || vistos.has(slug)) continue;
    if (/"isDraft":\[0,true\]/.test(p)) continue;
    vistos.add(slug);
    posts.push({
      slug,
      title: campo(p, 'name'),
      date: campo(p, 'date'),
      minutes: Number(campo(p, 'minutesToRead')) || null,
      coverPath: campo(p, 'coverImagePath'),
      coverOrigin: campo(p, 'coverImageOrigin'),
      coverAlt: campo(p, 'coverImageAlt'),
      description: campo(p, 'description'),
    });
  }
  return posts;
}

// ── 2. Limpeza do HTML do artigo ─────────────────────────────────────────────
const PERMITIDAS = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 'a', 'br', 'img', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td']);
const RENOMEAR = { h1: 'h2', b: 'strong', i: 'em' };

export function limparHtml(node, ctx) {
  let out = '';
  for (const ch of node.childNodes) {
    if (ch.nodeType === 3) { out += ch.rawText; continue; }
    if (ch.nodeType !== 1) continue;
    let tag = (ch.rawTagName || '').toLowerCase();
    if (['script', 'style', 'svg', 'button', 'form', 'iframe'].includes(tag)) continue;
    tag = RENOMEAR[tag] || tag;
    const dentro = limparHtml(ch, ctx);
    if (!PERMITIDAS.has(tag)) { out += dentro; continue; }
    if (tag === 'br') { out += '<br />'; continue; }
    if (tag === 'img') {
      const src = ch.getAttribute('src') || '';
      if (!src) continue;
      const id = `img${ctx.imgs.length}`;
      ctx.imgs.push({ id, src });
      out += `<img src="{{${id}}}" alt="${(ch.getAttribute('alt') || '').replace(/"/g, '&quot;')}" loading="lazy" />`;
      continue;
    }
    if (tag === 'a') {
      const href = ctx.link(ch.getAttribute('href') || '');
      out += href ? `<a href="${href.replace(/"/g, '&quot;')}">${dentro}</a>` : dentro;
      continue;
    }
    if (['p', 'li', 'h2', 'h3', 'h4'].includes(tag) && !dentro.replace(/<br \/>|&nbsp;|\s/g, '')) continue;
    out += `<${tag}>${dentro}</${tag}>`;
  }
  return out;
}

// ── 3. Imagens ───────────────────────────────────────────────────────────────
function urlCapa(p) {
  if (!p.coverPath) return '';
  if (/^https?:/.test(p.coverPath)) return p.coverPath;
  if (p.coverOrigin === 'unsplash' || /^photo-/.test(p.coverPath))
    return `https://images.unsplash.com/${p.coverPath}?auto=format&fit=crop&w=1200&q=75`;
  return `https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,fit=crop/${SITE_ID}/${p.coverPath}`;
}
function normalizarImg(src) {
  try {
    const u = new URL(src, ORIGEM);
    if (u.host === 'assets.zyrosite.com') {
      // remove redimensionamentos e pede uma versão de até 1200px
      const partes = u.pathname.split('/').filter(Boolean);
      const i = partes.indexOf(SITE_ID);
      const caminho = i >= 0 ? partes.slice(i).join('/') : partes.slice(-2).join('/');
      return `https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200/${caminho}`;
    }
    return u.href;
  } catch { return ''; }
}
const EXT = { 'image/webp': 'webp', 'image/avif': 'avif', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif' };
const cacheImg = new Map();
async function baixarImg(src) {
  const url = normalizarImg(src);
  if (!url) return '';
  if (!/assets\.zyrosite\.com|equipeavanco\.com\.br/.test(url)) return url; // Unsplash etc.: mantém o link
  if (cacheImg.has(url)) return cacheImg.get(url);
  const r = await get(url, { headers: { accept: 'image/webp,image/jpeg,image/*' } });
  if (!r) { cacheImg.set(url, url); return url; }
  const ext = EXT[(r.headers.get('content-type') || '').split(';')[0]] || 'jpg';
  const nome = `${crypto.createHash('md5').update(url).digest('hex').slice(0, 12)}.${ext}`;
  await fs.writeFile(`${OUT_IMG}/${nome}`, Buffer.from(await r.arrayBuffer()));
  const local = `/blog/${nome}`;
  cacheImg.set(url, local);
  return local;
}

// ── 4. Artigo ────────────────────────────────────────────────────────────────
async function importar(p, slugs) {
  const r = await get(`${ORIGEM}/${p.slug}`);
  if (!r) return { erro: 'não encontrado' };
  const doc = parse(await r.text());
  const hdr = doc.querySelector('.block-blog-header');
  const ps = hdr ? hdr.querySelectorAll('p') : [];
  const subtitle = ps[0] ? ps[0].text.trim() : '';
  const autorBruto = ps.length >= 3 ? ps[1].text.trim() : '';
  const author = /\d+\/\d+\/\d{4}|min read/.test(autorBruto) ? '' : autorBruto;
  const secoes = doc.querySelectorAll('main.page .page__blocks > section');
  const corpoSecao = secoes[1] || doc;
  const caixas = corpoSecao.querySelectorAll('.layout-element__component--GridTextBox');
  const corpo = caixas.sort((a, b) => b.text.length - a.text.length)[0];
  if (!corpo) return { erro: 'sem corpo' };

  const ctx = {
    imgs: [],
    link: (href) => {
      if (!href || href.startsWith('#') || href.startsWith('javascript')) return '';
      try {
        const u = new URL(href, ORIGEM);
        if (u.host.replace(/^www\./, '') === 'equipeavanco.com.br') {
          const s = u.pathname.replace(/^\/|\/$/g, '');
          if (slugs.has(s)) return `/blog/${s}`;
          if (s === 'bombeiros-civil-contato') return '/contato';
          if (s === 'bombeiros-civil-blog') return '/blog';
          return '/';
        }
        return u.href;
      } catch { return ''; }
    },
  };
  let html = limparHtml(corpo, ctx);
  for (const im of ctx.imgs) html = html.replace(`{{${im.id}}}`, await baixarImg(im.src));

  let cover = '';
  const og = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const capa = og || urlCapa(p);
  if (capa) cover = await baixarImg(capa);
  if (!cover) {
    const img = corpoSecao.querySelector('.layout-element__component--GridImage img');
    if (img) cover = await baixarImg(img.getAttribute('src') || '');
  }

  const post = {
    slug: p.slug,
    title: p.title || (hdr && hdr.querySelector('h1')?.text.trim()) || p.slug,
    subtitle,
    description: p.description || subtitle,
    author,
    date: p.date,
    minutes: p.minutes,
    cover,
    coverAlt: p.coverAlt || p.title,
    html,
  };
  await fs.writeFile(`${OUT_JSON}/${p.slug}.json`, JSON.stringify(post, null, 1));
  return { ok: true };
}

// ── Execução ─────────────────────────────────────────────────────────────────
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  await fs.mkdir(OUT_JSON, { recursive: true });
  await fs.mkdir(OUT_IMG, { recursive: true });
  const r = await get(LISTA);
  if (!r) throw new Error('Não consegui abrir a página do blog');
  const posts = lerLista(await r.text());
  console.log(`Artigos encontrados: ${posts.length}`);
  if (posts.length < 10) throw new Error('Poucos artigos encontrados, verifique o formato da página');
  const slugs = new Set(posts.map((p) => p.slug));
  let ok = 0;
  const falhas = [];
  const fila = [...posts];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (fila.length) {
      const p = fila.shift();
      try {
        const res = await importar(p, slugs);
        if (res.ok) ok++; else falhas.push(`${p.slug}: ${res.erro}`);
      } catch (e) { falhas.push(`${p.slug}: ${e.message}`); }
      if ((ok + falhas.length) % 25 === 0) console.log(`${ok + falhas.length}/${posts.length}`);
    }
  }));
  console.log(`Importados: ${ok}. Falhas: ${falhas.length}`);
  falhas.forEach((f) => console.log('  - ' + f));
}
