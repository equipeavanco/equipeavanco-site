// Mapa das fotos do portfólio. A chave bate com o campo `image` de cada
// evento em site.ts. Para adicionar: coloque a foto em src/assets/portfolio/
// e registre aqui.
import type { ImageMetadata } from 'astro';

import loba2026 from '../assets/portfolio/loba2026.png';
import boticario from '../assets/portfolio/boticario.png';
import morango from '../assets/portfolio/morango.png';
import sorriso from '../assets/portfolio/sorriso.png';
import xbusiness from '../assets/portfolio/xbusiness.png';
import samba from '../assets/portfolio/samba.png';
import loba2025 from '../assets/portfolio/loba2025.png';

export const portfolioImages: Record<string, ImageMetadata> = {
  loba2026,
  boticario,
  morango,
  sorriso,
  xbusiness,
  samba,
  loba2025,
};
