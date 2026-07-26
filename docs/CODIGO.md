# Guía del código del generador de carteles

Este documento deja una copia navegable del mapa del repositorio y explica para qué sirve cada pieza antes de modificarla.

## ¿Para qué sirve esta app?

La aplicación es un generador local de carteles de oferta para supermercado. Permite cargar nombre de producto, precio, textos promocionales, colores, forma del sello, tamaño de hoja y cantidad de copias. Con esos datos muestra una vista previa en tiempo real, permite guardar varios productos y exporta todos los carteles a PDF o impresión.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

Vite levanta la app React y muestra la URL local en la terminal.

## Estructura principal

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
└── src
    ├── components
    │   ├── ControlPanel.jsx
    │   ├── OfferPoster.jsx
    │   ├── TemplateRenderer.jsx
    │   └── TemplateSelector.jsx
    ├── hooks
    │   └── useLocalStorage.js
    ├── pages
    │   └── App.jsx
    ├── templates
    │   ├── OfertaClasica.jsx
    │   ├── OfertaPremium.jsx
    │   ├── Liquidacion.jsx
    │   ├── PrecioBajo.jsx
    │   ├── NuevoIngreso.jsx
    │   ├── Combo.jsx
    │   └── templateRegistry.js
    ├── utils
    │   ├── id.js
    │   ├── pdf.js
    │   ├── posterOptions.js
    │   └── textSizing.js
    ├── main.jsx
    └── styles.css
```

## Archivos y responsabilidades

### `package.json`

Define el proyecto `precios-ofertas`, los comandos de Vite y las dependencias:

- `npm run dev`: servidor de desarrollo.
- `npm run build`: compila producción.
- `npm run preview`: previsualiza el build.
- React renderiza la UI.
- Tailwind aplica estilos utilitarios.
- `html2canvas`, `jspdf` y `html2pdf.js` se usan para exportación PDF.
- `lucide-react` aporta íconos.

### `index.html`

Es la plantilla HTML base. Carga la fuente Inter desde Google Fonts, define el título de la página y monta React en el nodo `#root` mediante `/src/main.jsx`.

### `tailwind.config.js` y `postcss.config.js`

Configuran Tailwind para escanear `index.html` y todos los archivos `js/jsx` de `src`. También extienden la familia tipográfica `sans` con Inter.

### `src/main.jsx`

Punto de entrada de React. Importa los estilos globales y renderiza `<App />` dentro de `React.StrictMode`.

### `src/pages/App.jsx`

Componente raíz y centro de la lógica de negocio:

- Guarda el tamaño elegido en `localStorage`.
- Mantiene el cartel actual en estado.
- Mantiene la lista de productos guardados.
- Calcula qué carteles se exportan: guardados o, si no hay, el actual.
- Expande copias para exportar varias páginas.
- Maneja guardar, eliminar, limpiar, imprimir y exportar PDF.
- Define atajos de teclado: `Enter` exporta PDF y `Ctrl/Cmd + P` imprime.
- Renderiza el panel, la vista previa, el crédito y un lote oculto usado para crear PDFs multipágina.

### `src/components/ControlPanel.jsx`

Panel lateral editable. Muestra inputs, selects y botones para:

- Texto del cartel rojo.
- Nombre del producto.
- Precio.
- Tamaño A4/A5.
- Texto llamativo.
- Color y forma del sello.
- Color del borde.
- Cantidad de copias.
- Exportar PDF, guardar, imprimir, limpiar y eliminar productos guardados.

### `src/components/OfferPoster.jsx`

Envuelve la vista previa comercial del cartel, muestra el nombre de la plantilla activa y delega el dibujo final en `TemplateRenderer`.

### `src/components/TemplateSelector.jsx`

Muestra la sección **DISEÑO**, filtra plantillas por categorías y renderiza miniaturas reales usando el mismo componente visual que se imprimirá.

### `src/components/TemplateRenderer.jsx`

Recibe el ID de plantilla y usa un mapa de componentes para renderizar el diseño correcto sin `if` gigantes. Traduce el estado interno del cartel a las props comunes de las plantillas: `producto`, `precio`, `mensaje`, `logo` y `tamaño`.

### `src/templates/`

Contiene las plantillas independientes iniciales: Oferta Clásica, Oferta Premium, Liquidación, Precio Bajo, Nuevo y Combo. `templateRegistry.js` centraliza metadata, categorías y el mapa de componentes para que sumar diseños nuevos sea simple.

### `src/utils/posterOptions.js`

Centraliza opciones configurables:

- Medidas A4 y A5 en milímetros y clases de proporción.
- Textos llamativos predeterminados.
- Colores disponibles del sello.
- Colores disponibles del borde.
- Formas del sello.
- Valores iniciales del cartel.

Es el primer lugar recomendado para agregar nuevos colores, tamaños, textos o defaults.

### `src/utils/textSizing.js`

Calcula tamaños de fuente según la longitud de los textos. Esto evita que precios o nombres largos se salgan del cartel al mostrar o exportar.

### `src/utils/pdf.js`

Exporta carteles a PDF:

- Limpia el nombre del producto para formar el nombre del archivo.
- Duplica carteles según la cantidad de copias.
- Fuerza medidas exactas A4/A5 antes de capturar.
- Convierte cada cartel a canvas con `html2canvas`.
- Inserta cada canvas en `jsPDF` como página.
- Restaura estilos temporales al terminar.

### `src/utils/id.js`

Genera IDs para productos guardados. Usa `crypto.randomUUID()` cuando existe y cae a un ID con timestamp y random cuando no está disponible.

### `src/hooks/useLocalStorage.js`

Hook pequeño para persistir preferencias locales. Actualmente recuerda el último tamaño de cartel elegido.

### `src/styles.css`

Carga Tailwind, define estilos base y reglas de impresión. En impresión oculta la interfaz (`no-print`, lote de exportación, título de preview) y deja solo la hoja imprimible con medidas exactas.

## Flujo de datos

1. `App.jsx` crea el estado del cartel actual desde `DEFAULT_POSTER`.
2. `ControlPanel.jsx` recibe ese estado y llama `onChange` cuando el usuario edita algo.
3. `OfferPoster.jsx` recibe el cartel actualizado y lo muestra en vivo.
4. Al guardar, `App.jsx` agrega el cartel actual a `savedPosters` con un ID.
5. Al exportar, `App.jsx` decide si exporta los guardados o el cartel actual.
6. `pdf.js` expande las copias, captura cada `.poster-page` y arma el PDF.

## Puntos rápidos para modificar

- Cambiar textos iniciales: `src/utils/posterOptions.js` en `DEFAULT_POSTER`.
- Agregar tamaños de hoja: `src/utils/posterOptions.js` en `SIZES`.
- Agregar colores: `STAMP_COLORS` o `BORDER_COLORS`.
- Cambiar diseño del cartel: crear o editar componentes en `src/templates/` y registrarlos en `src/templates/templateRegistry.js`.
- Cambiar formulario o botones: `src/components/ControlPanel.jsx`.
- Cambiar reglas de exportación PDF: `src/utils/pdf.js`.
- Cambiar reglas de impresión: `src/styles.css`.
