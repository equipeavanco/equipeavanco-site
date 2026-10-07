# Site da Equipe Avanço

Site institucional da **Equipe Avanço** — assessoria preventiva, médica e pericial.
Feito com [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) e publicado
gratuitamente no **GitHub Pages**.

---

## ✏️ Como editar o conteúdo (sem mexer em código)

Quase todo o conteúdo do site fica em **um único arquivo**:

> `src/data/site.ts`

Lá você edita:

- Nome, tagline e descrição da empresa
- Telefones, e-mails, WhatsApp e redes sociais
- Lista de serviços (títulos, resumos e itens)
- Missão, visão e valores
- Diferenciais e portfólio de eventos
- ID do formulário de contato (Formspree)
- Link do painel do Power BI

Depois de salvar, é só fazer um **commit** — o site é publicado sozinho em poucos minutos.

### Trocar o logo

Substitua os arquivos em `src/assets/`:
- `logo.png` — logo completo
- `logo-transparent.png` — logo com fundo transparente (usado no cabeçalho)

---

## 📨 Ativar o formulário de contato

1. Crie uma conta grátis em <https://formspree.io>.
2. Crie um formulário e copie o ID (ex.: `xdoqwerty`, que aparece na URL `formspree.io/f/xdoqwerty`).
3. Em `src/data/site.ts`, preencha `formspreeId: 'xdoqwerty'`.

---

## 📊 Incorporar o Power BI (painel público)

1. No Power BI, use **Publicar na Web (público)** e copie o endereço do iframe.
2. Em `src/data/site.ts`, cole a URL em `powerBi.embedUrl`.

> ⚠️ "Publicar na Web" deixa o relatório **público**. O acesso por usuário (cada cliente
> vê só os próprios dados) é a **Fase 2** do projeto.

---

## 🌐 Ligar o domínio próprio (equipeavanco.com.br)

Quando for virar o domínio, edite `astro.config.mjs`:

```js
const SITE = 'https://equipeavanco.com.br';
const BASE = '/';
```

Crie também um arquivo `public/CNAME` com o conteúdo:

```
equipeavanco.com.br
```

Faça o commit e configure o domínio em **Settings → Pages → Custom domain**.

---

## 💻 Rodar localmente (opcional, para quem tem Node)

```bash
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:4321
npm run build    # gera a pasta dist/ (site pronto)
npm run preview  # pré-visualiza o build
```

Requer Node.js 18+ (recomendado 22).

---

## 🚀 Como o site é publicado

A cada `push` na branch **main**, o GitHub Actions (arquivo `.github/workflows/deploy.yml`)
monta o site e publica no GitHub Pages automaticamente. Nada manual.
