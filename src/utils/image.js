// Elimina fondos lisos estimando el color desde las cuatro esquinas de la foto.
// Todo sucede localmente en el navegador; la imagen nunca se envía a un servidor.
export function removeFlatBackground(source, tolerance = 55) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const maxSide = 1400;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const corners = [[0, 0], [canvas.width - 1, 0], [0, canvas.height - 1], [canvas.width - 1, canvas.height - 1]];
      const background = corners.reduce((sum, [x, y]) => {
        const index = (y * canvas.width + x) * 4;
        return [sum[0] + pixels.data[index], sum[1] + pixels.data[index + 1], sum[2] + pixels.data[index + 2]];
      }, [0, 0, 0]).map((value) => value / corners.length);

      for (let index = 0; index < pixels.data.length; index += 4) {
        const distance = Math.hypot(pixels.data[index] - background[0], pixels.data[index + 1] - background[1], pixels.data[index + 2] - background[2]);
        pixels.data[index + 3] = Math.round(255 * Math.min(1, Math.max(0, (distance - tolerance * 0.45) / (tolerance * 0.55))));
      }
      context.putImageData(pixels, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('No se pudo procesar la imagen.'));
    image.src = source;
  });
}
