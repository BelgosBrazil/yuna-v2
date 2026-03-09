/**
 * URLs dos vídeos - Firebase Storage belgoscrm (pasta Yuna)
 * Formato direto - funciona sem precisar do Firebase SDK para vídeos
 */
const BUCKET = 'belgoscrm.firebasestorage.app';
const BASE = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o`;
const encoded = (path) => encodeURIComponent(path).replace(/'/g, '%27');

const EXTERNAL_VIDEO_URLS = {
  '4_minha_historia_fev25_reels.mp4': `${BASE}/${encoded('Yuna/4_minha_historia_fev25_reels.mp4')}?alt=media`,
  '5_minha_historia_fev25_reels.mp4': `${BASE}/${encoded('Yuna/5_minha_historia_fev25_reels.mp4')}?alt=media`,
  'valeria_jul25_reels.mp4': `${BASE}/${encoded('Yuna/valeria_jul25_reels.mp4')}?alt=media`,
  'Case_Sr.Vânio_legendado.mp4': `${BASE}/${encoded('Yuna/Case_Sr.Vânio_legendado.mp4')}?alt=media`,
  'case Dra. Célia - rev.01.mp4': `${BASE}/${encoded('Yuna/case Dra. Célia - rev.01.mp4')}?alt=media`,
  'Srvanio.mp4': `${BASE}/${encoded('Yuna/Srvanio.mp4')}?alt=media`,
  'celia.mp4': `${BASE}/${encoded('Yuna/celia.mp4')}?alt=media`,
  'banneryuna.mp4': `${BASE}/${encoded('Yuna/banneryuna.mp4')}?alt=media`,
};
window.EXTERNAL_VIDEO_URLS = EXTERNAL_VIDEO_URLS;
