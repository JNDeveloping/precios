// Reduce tipografías de forma progresiva para evitar desbordes en textos largos y PDF.
export function getPriceFontSize(price) {
  const length = String(price || '').length;
  if (length <= 5) return '9.5rem';
  if (length <= 8) return '7.2rem';
  if (length <= 11) return '5.4rem';
  return '4rem';
}

export function getCurrencyFontSize(price) {
  const length = String(price || '').length;
  if (length <= 8) return '4.4rem';
  if (length <= 11) return '3.4rem';
  return '2.6rem';
}

export function getProductFontSize(name) {
  const length = String(name || '').length;
  if (length <= 22) return '4.2rem';
  if (length <= 40) return '3.2rem';
  if (length <= 64) return '2.45rem';
  if (length <= 90) return '1.9rem';
  return '1.55rem';
}

export function getOfferFontSize(label) {
  const length = String(label || '').length;
  if (length <= 8) return '3rem';
  if (length <= 14) return '2.35rem';
  return '1.8rem';
}
