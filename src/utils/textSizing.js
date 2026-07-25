// Reduce tipografías de forma progresiva para evitar desbordes en textos largos.
export function getPriceFontSize(price) {
  const length = String(price || '').length;
  if (length <= 5) return 'clamp(5.5rem, 18vw, 11rem)';
  if (length <= 8) return 'clamp(4.3rem, 13vw, 8.2rem)';
  if (length <= 11) return 'clamp(3.3rem, 10vw, 6.2rem)';
  return 'clamp(2.4rem, 8vw, 4.6rem)';
}

export function getProductFontSize(name) {
  const length = String(name || '').length;
  if (length <= 22) return 'clamp(2rem, 6vw, 4.8rem)';
  if (length <= 40) return 'clamp(1.7rem, 4.8vw, 3.7rem)';
  if (length <= 64) return 'clamp(1.35rem, 3.9vw, 2.9rem)';
  return 'clamp(1.05rem, 3vw, 2.2rem)';
}
