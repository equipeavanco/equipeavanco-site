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
  { label: 'Portfólio', href: '/portfolio' },
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

// ───────────────────────────────────────────────────────────────────────────
// PORTFÓLIO DE EVENTOS
// A foto de cada evento fica em src/assets/portfolio/<image>.png e é ligada
// pelo campo `image` (ver o mapa de imagens em src/data/portfolioImages.ts).
// Para adicionar um evento: coloque a foto na pasta, registre no mapa e
// acrescente um item aqui embaixo.
// ───────────────────────────────────────────────────────────────────────────
export type PortfolioEvent = {
  slug: string;
  image: string; // chave no mapa de imagens
  title: string;
  subtitle: string;
  intro?: string; // frase antes da lista
  items: string[];
  note?: string; // frase de fechamento (em itálico)
};

export const portfolio: PortfolioEvent[] = [
  {
    slug: 'loba-fest-run-2026',
    image: 'loba2026',
    title: 'Loba Fest Run 2026',
    subtitle: 'Maratona na Ilha do Mel/PR — Segurança Premium 360°',
    intro: 'Estrutura completa de proteção aos atletas:',
    items: [
      'Tenda Médica Avançada com equipe de emergência',
      'Ambulância UTI equipada e posicionada estrategicamente',
      'Lancha de Resgate com equipamentos completos para atendimento aquático',
      'Monitoramento Aéreo com drone e helicóptero de prontidão',
      'Equipes Especializadas em terra e água para cobertura total',
    ],
  },
  {
    slug: 'ativacao-grupo-boticario',
    image: 'boticario',
    title: 'Ativação Grupo Boticário',
    subtitle: 'Grande ativação do Natal 2025 em Curitiba, com estrutura de alto fluxo e operação técnica especializada.',
    intro: 'Cobertura completa com:',
    items: [
      'Brigada de Bombeiros Civis',
      'Suporte médico e atendimento emergencial',
      'Supervisão preventiva na montagem',
      'Monitoramento contínuo e gestão de riscos',
      'Conformidade técnica e assessoria pericial',
    ],
    note: 'Execução segura, padronizada e com alta capacidade operacional.',
  },
  {
    slug: 'festa-do-morango',
    image: 'morango',
    title: 'Festa do Morango',
    subtitle: 'Acompanhamento estratégico na Festa do Morango, garantindo operação segura em um dos eventos mais aguardados da região.',
    intro: 'Cobertura completa com:',
    items: [
      'Estrutura integrada de segurança e resposta emergencial',
      'Ambulatório avançado, bombeiros civis e socorristas especializados',
      'Atendimento operacional contínuo durante todo o evento',
      'Monitoramento ativo e gestão preventiva de riscos',
    ],
    note: 'Segurança bem executada gera confiança, protege a marca e sustenta a experiência do público.',
  },
  {
    slug: 'show-sorriso-as-antigas',
    image: 'sorriso',
    title: 'Show Sorriso as Antigas',
    subtitle: 'Uma das maiores atrações do pagode brasileiro. Cobertura de segurança completa com:',
    items: [
      'Supervisão especializada na montagem e desmontagem do cenário',
      'Equipe de bombeiros civis certificados',
      'Socorristas preparados para atendimento emergencial',
      'Monitoramento contínuo durante todo o evento',
    ],
  },
  {
    slug: 'x-business',
    image: 'xbusiness',
    title: 'X Business',
    subtitle: 'O maior ecossistema de negócios e networking da América Latina — com a excelência em segurança da Equipe Avanço:',
    items: [
      'Solução integrada de segurança que superou as expectativas',
      'Estrutura completa: ambulatório avançado, bombeiros civis e socorristas especializados',
      'Atendimento premium 24/7 durante todo o evento',
      'Prevenção inteligente com monitoramento ativo',
    ],
    note: 'Fomos além da segurança básica, entregando tranquilidade para milhares de participantes e organizadores.',
  },
  {
    slug: 'festival-samba-curitiba',
    image: 'samba',
    title: 'Festival Samba Curitiba',
    subtitle: 'Um dos maiores festivais de pagode do Brasil, com segurança de alto padrão da Equipe Avanço:',
    items: [
      'Cobertura 360° — do planejamento à execução',
      'Equipe especializada — bombeiros civis e socorristas treinados',
      'Suporte médico — ambulância equipada e plantão permanente',
      'Prevenção ativa — monitoramento contínuo de todo o ambiente',
    ],
    note: 'Garantimos a segurança para que a festa nunca pare!',
  },
  {
    slug: 'loba-fest-run-2025',
    image: 'loba2025',
    title: 'Loba Fest Run 2025',
    subtitle: 'Maratona na Ilha do Mel/PR — Segurança Premium 360°',
    intro: 'Estrutura completa de proteção aos atletas:',
    items: [
      'Tenda Médica Avançada com equipe de emergência',
      'Ambulância UTI equipada e posicionada estrategicamente',
      'Lancha de Resgate com equipamentos completos para atendimento aquático',
      'Monitoramento Aéreo com drone e helicóptero de prontidão',
      'Equipes Especializadas em terra e água para cobertura total',
    ],
  },
];

// ───────────────────────────────────────────────────────────────────────────
// AVALIAÇÕES (GOOGLE)
// Avaliações reais de clientes no Google. Para trocar/adicionar, edite aqui.
// googleReviewsUrl: link do perfil da empresa no Google (botão "Ver no Google").
// ───────────────────────────────────────────────────────────────────────────
export const googleReviewsUrl = '';

export type Review = { name: string; rating: number; when: string; text: string };

export const reviews: Review[] = [
  {
    name: 'Melissa B. de Souza',
    rating: 5,
    when: '4 meses atrás',
    text: 'A equipe presta socorro com muita excelência. São bem preventivos e estão aptos para qualquer situação. Fazem tudo com amor e carinho, sempre trabalhando em equipe e focados no trabalho. Amam o próximo e salvar vidas, com um atendimento especial e seguindo rigorosamente os protocolos. Nota 1000, parabéns a todos!',
  },
  {
    name: 'Samuel',
    rating: 5,
    when: '5 meses atrás',
    text: 'Excelente atendimento. Minha namorada passou mal em uma festa e deram todo o suporte e atenção. Ficamos muito satisfeitos com o trabalho bem feito, principalmente a profissional Nicoly, que prestou um atendimento de destaque. Profissionais muito humanizados.',
  },
  {
    name: 'Emilly Massolin',
    rating: 5,
    when: '2 meses atrás',
    text: 'Gostaria de deixar a minha satisfação com a equipe de bombeiros. Fomos atendidos super bem e com bastante cuidado.',
  },
  {
    name: 'Afonso Andrade',
    rating: 5,
    when: '7 meses atrás',
    text: 'Muito atenciosos e cuidadosos, deram todo o suporte necessário. Equipe ótima, gentil e capacitada!',
  },
];
