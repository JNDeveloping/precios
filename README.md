# Generador de carteles de oferta

Aplicación web local, moderna y responsive para crear carteles de supermercado listos para PDF o impresión en A4/A5.

## Guía para modificar

Para entender el código antes de tocarlo, revisá [`docs/CODIGO.md`](docs/CODIGO.md). Ahí está el mapa del repositorio, el flujo de datos y los puntos recomendados para cambiar textos, colores, tamaños, diseño, PDF e impresión.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abrí la URL que informa Vite en la terminal.

## Uso

- Editá producto, precio, tamaño, texto del cartel rojo, texto llamativo, forma/color del sello y color del borde.
- Elegí un diseño desde **DISEÑO** para cambiar completamente el estilo visual del cartel sin modificar los datos cargados.
- La vista previa se actualiza automáticamente y achica precio/nombre cuando son largos para que no sobresalgan.
- Indicá la cantidad de copias del producto actual antes de exportar.
- Usá **Guardar** para acumular distintos productos; al generar PDF se exportan todos los productos guardados, respetando sus copias, y luego la lista se limpia automáticamente.
- Si no hay productos guardados, el PDF se genera con el producto que está en pantalla.
- `Enter` genera el PDF.
- `Ctrl + P` abre la impresión.
- El crédito “Web Desarrollada por Tomas Victola” se muestra en la página, no dentro de la hoja imprimible.
- El último tamaño elegido queda guardado en el navegador.


## Diseños disponibles

La app incluye un sistema de plantillas preparado para crecer sin cambiar la lógica principal. Las plantillas iniciales son: Oferta Clásica, Oferta Premium, Liquidación, Precio Bajo, Nuevo, Combo, Black Friday y Mayorista.
