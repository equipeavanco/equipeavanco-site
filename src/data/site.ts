// ════════════════════════════════════════════════════════════════════════
//  CONTEÚDO DO SITE — EQUIPE AVANÇO
//  Edite este arquivo para mudar textos, contatos, serviços e menu.
//  (Praticamente tudo do site é controlado a partir daqui.)
// ════════════════════════════════════════════════════════════════════════

/** Prefixa os links internos com o caminho base configurado em astro.config.mjs */
export function href(path = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  const out = `${b}${p}`.replace(/\/{2,}/g, '/');
  return out === '' ? '/' : out;
}

export const site = {
  name: 'Equipe Avanço',
  shortName: 'Avanço',
  legalName: 'Equipe Avanço',
  tagline: 'Em progresso pela vida',
  descriptor: 'Assessoria preventiva, médica e pericial',
  foundedYear: 2019,
  description:
    'Especialistas em Segurança e Saúde Ocupacional. Cobertura médica de eventos, treinamentos, consultoria e perícia técnica com atendimento em todo o Brasil.',
};

export const contact = {
  emails: ['contato@equipeavanco.com.br', 'equipeavanco@outlook.com.br'],
  phones: [
    { name: 'Pedro Mendes', number: '+55 41 99286-7248', whatsapp: '5541992867248' },
    { name: 'Lucas Soares', number: '+55 41 98411-8235', whatsapp: '5541984118235' },
  ],
  /** WhatsApp principal usado nos botões de ação */
  primaryWhatsapp: '5541992867248',
  whatsappMessage: 'Olá! Vim pelo site da Equipe Avanço e gostaria de solicitar um orçamento.',
  // ───────────────────────────────────────────────────────────────────────
  // FORMULÁRIO DE CONTATO (Formspree)
  // 1. Crie uma conta grátis em https://formspree.io
  // 2. Crie um formulário e copie o ID (ex.: "xdoqwerty" da URL formspree.io/f/xdoqwerty)
  // 3. Cole o ID abaixo. Enquanto estiver vazio, o formulário mostra um aviso.
  // ───────────────────────────────────────────────────────────────────────
  formspreeId: 'mdeaezgb',
  social: {
    instagram: 'https://instagram.com/equipeavanco',
    facebook: 'https://facebook.com/avanco.equipe',
  },
  region: 'Atendimento em todo o Brasil',
};

// ───────────────────────────────────────────────────────────────────────────
// POWER BI (painel público)
// Para exibir um painel: no Power BI, use "Publicar na Web (público)",
// copie o link do iframe e cole a URL em embedUrl abaixo.
// Enquanto estiver vazio, a página mostra um aviso de "em breve".
// Atenção: "Publicar na Web" deixa o relatório PÚBLICO. O acesso por usuário
// (cada cliente vê só os próprios dados) é a Fase 2.
// ───────────────────────────────────────────────────────────────────────────
export const powerBi = {
  embedUrl: '',
};

export const nav = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Cliente', href: '/cliente' },
  { label: 'Contato', href: '/contato' },
];

export type Service = {
  slug: string;
  icon: string; // nome do ícone (ver Icon.astro)
  title: string;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: 'cobertura-eventos',
    icon: 'ambulance',
    title: 'Cobertura médica de eventos',
    summary:
      'Estrutura completa de emergência para o seu evento, do pequeno porte aos grandes festivais.',
    items: [
      'Bombeiros civis, socorristas e resgatistas',
      'Médicos, enfermeiros e equipe de APH',
      'Ambulâncias (básicas e UTI)',
      'Guarda-vidas e resgate aquático',
      'Tendas médicas e postos fixos de atendimento',
    ],
  },
  {
    slug: 'treinamentos',
    icon: 'graduation',
    title: 'Treinamentos e capacitações',
    summary:
      'Capacitação prática e certificada para equipes e brigadas, sob medida para a sua operação.',
    items: [
      'CIPA e primeiros socorros',
      'NR-33 (espaços confinados) e NR-35 (trabalho em altura)',
      'Combate a incêndio e brigada de emergência',
      'Planos de abandono e evacuação',
      'Instrutores certificados',
    ],
  },
  {
    slug: 'consultoria',
    icon: 'clipboard',
    title: 'Consultoria em SST',
    summary:
      'Diagnóstico, conformidade legal e gestão de riscos em Segurança e Saúde Ocupacional.',
    items: [
      'Análise ambiental e mapeamento de riscos',
      'Programas de conformidade: PGR, PCMSO e LTCAT',
      'Adequação às Normas Regulamentadoras',
      'Acompanhamento técnico contínuo',
    ],
  },
  {
    slug: 'pericia',
    icon: 'scale',
    title: 'Assessoria pericial',
    summary:
      'Perícia técnica judicial e extrajudicial com laudos precisos e embasados.',
    items: [
      'Perícia judicial e extrajudicial',
      'Análise de insalubridade e periculosidade',
      'Estudos de viabilidade técnica',
      'Laudos e pareceres técnicos',
    ],
  },
];

export type Differentiator = { icon: string; title: string; text: string };

export const differentiators: Differentiator[] = [
  { icon: 'bolt', title: 'Agilidade', text: 'Resposta rápida em emergências, quando cada minuto conta.' },
  { icon: 'scale', title: 'Perícia técnica', text: 'Análise técnica especializada e laudos confiáveis.' },
  { icon: 'map', title: 'Atendimento nacional', text: 'Cobertura em todo o território brasileiro.' },
  { icon: 'target', title: 'Solução sob medida', text: 'Serviços e treinamentos ajustados à sua necessidade.' },
];

export const mvv = {
  mission:
    'Oferecer soluções estratégicas e inovadoras que garantam ambientes mais seguros, com atendimento ágil, padronizado e de alta performance.',
  vision:
    'Ser a principal escolha em assessoria preventiva, médica e pericial, reconhecida pela confiabilidade, inovação e resultados, tornando-se referência no setor.',
  values: [
    'Essencialidade para o cliente',
    'Profissionalismo em evolução',
    'Segurança e prevenção inteligentes',
    'Economia inteligente',
    'Precisão e agilidade cirúrgicas',
    'Confiança construída na transparência',
  ],
};

export type PortfolioEvent = { title: string; detail: string };

export const portfolio: PortfolioEvent[] = [
  { title: 'Loba Fest Run 2026', detail: 'Maratona em ilha com tenda médica avançada, ambulância UTI, barco de resgate e monitoramento aéreo.' },
  { title: 'Ativação Grupo Boticário', detail: 'Operação de Natal 2025, em Curitiba.' },
  { title: 'Festa do Morango', detail: 'Cobertura médica e de segurança do evento.' },
  { title: 'Sorriso as Antigas', detail: 'Cobertura de show e público.' },
  { title: 'X Business', detail: 'Maior ecossistema de networking da América Latina.' },
  { title: 'Festival Samba Curitiba', detail: 'Cobertura de evento de grande público.' },
];
