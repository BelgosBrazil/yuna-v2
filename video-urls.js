/**
 * URLs dos vídeos hospedados externamente
 *
 * O Vercel Hobby limita o deploy a 100 MB. Os vídeos (~428 MB) precisam
 * estar em outro serviço. Opções gratuitas:
 *
 * - Vimeo: vimeo.com → upload → obter link direto .mp4
 * - Cloudflare R2: r2.cloudflare.com (10GB grátis)
 *
 * Cole as URLs diretas (.mp4) abaixo:
 */
const EXTERNAL_VIDEO_URLS = {
  // '4_minha_historia_fev25_reels.mp4': 'https://...',
  // '5_minha_historia_fev25_reels.mp4': 'https://...',
  // 'valeria_jul25_reels.mp4': 'https://...',
  // 'Case_Sr.Vânio_legendado.mp4': 'https://...',
  // 'case Dra. Célia - rev.01.mp4': 'https://...',
};
window.EXTERNAL_VIDEO_URLS = EXTERNAL_VIDEO_URLS;
