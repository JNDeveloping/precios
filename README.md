# Generador de carteles de oferta

Aplicación web local, moderna y responsive para crear carteles de supermercado listos para PDF o impresión en A4/A5.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abrí la URL que informa Vite en la terminal.

## Uso

- Editá producto, precio, tamaño, texto del cartel rojo, texto llamativo y forma del sello.
- Elegí cualquier color para el fondo de la hoja, los bordes, el cartel de oferta, el sello, su fondo, el precio y el nombre del producto.
- Partí de plantillas listas para almacén: oferta clásica, 2×1, combo especial, precio mayorista y liquidación.
- Explorá las plantillas como una galería visual, con filtros de favoritas, nuevas y ofertas.
- Personalizá el nombre del negocio (por defecto, “El Rincon De Los Nietos”) y agregá opcionalmente una imagen del producto.
- Mové el cartel de oferta, el sello, el precio y el producto arrastrándolos con el mouse o con una pantalla táctil; las posiciones también se conservan al guardar y exportar.
- La vista previa se actualiza automáticamente y achica precio/nombre cuando son largos para que no sobresalgan.
- Indicá la cantidad de copias del producto actual antes de exportar.
- Usá **Guardar** para acumular distintos productos; al generar PDF se exportan todos los productos guardados, respetando sus copias, y luego la lista se limpia automáticamente.
- Si no hay productos guardados, el PDF se genera con el producto que está en pantalla.
- `Enter` genera el PDF.
- `Ctrl + P` abre la impresión.
- El crédito “Web Desarrollada por Tomas Victola” se muestra en la página, no dentro de la hoja imprimible.
- El último tamaño elegido queda guardado en el navegador.
