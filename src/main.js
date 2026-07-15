// Hero: garante autoplay do vídeo de fundo (alguns navegadores exigem play() explícito)
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.play().catch(() => {});
}

// Enquadramento das imagens dos trabalhos, fiel ao <image-slot> do Claude Design:
// baseline "cover" (max) × escala do usuário; deslocamentos x/y em % do frame.
function frameSlotImage(img) {
  const s = parseFloat(img.dataset.s || '1');
  const x = parseFloat(img.dataset.x || '0');
  const y = parseFloat(img.dataset.y || '0');
  if (s === 1 && x === 0 && y === 0) return; // cover centrado já resolve

  const frame = img.parentElement;
  const apply = () => {
    const fw = frame.clientWidth || 1;
    const fh = frame.clientHeight || 1;
    const iw = img.naturalWidth || 1;
    const ih = img.naturalHeight || 1;
    const k = Math.max(fw / iw, fh / ih) * s;
    img.style.width = (iw * k / fw * 100) + '%';
    img.style.height = (ih * k / fh * 100) + '%';
    img.style.left = (50 + x) + '%';
    img.style.top = (50 + y) + '%';
    img.style.objectFit = '';
  };
  if (img.complete && img.naturalWidth) apply();
  else img.addEventListener('load', apply, { once: true });
}

document.querySelectorAll('.slot img').forEach(frameSlotImage);
