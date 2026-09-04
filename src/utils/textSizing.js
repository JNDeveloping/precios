// Reduce tipografías de forma progresiva para evitar desbordes en textos largos y PDF.
export function getPriceFontSize(price) {
  const length = String(price || '').length;
  if (length <= 5) return '19cqw';
  if (length <= 8) return '14.5cqw';
  if (length <= 11) return '10.8cqw';
  return '8cqw';
}

export function getCurrencyFontSize(price) {
  const length = String(price || '').length;
  if (length <= 8) return '8.8cqw';
  if (length <= 11) return '6.8cqw';
  return '5.2cqw';
}

export function getProductFontSize(name) {
  const length = String(name || '').length;
  if (length <= 22) return '8.4cqw';
  if (length <= 40) return '6.4cqw';
  if (length <= 64) return '4.9cqw';
  if (length <= 90) return '3.8cqw';
  return '3.1cqw';
}

export function getOfferFontSize(label) {
  const length = String(label || '').length;
  if (length <= 8) return '6cqw';
  if (length <= 14) return '4.7cqw';
  return '3.6cqw';
}
