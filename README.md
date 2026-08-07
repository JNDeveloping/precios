# Generador de carteles de oferta

Aplicación web local, moderna y responsive para crear carteles de supermercado listos para PDF o impresión en A4/A5.

## Dos estudios en una sola aplicación

La barra superior permite cambiar entre dos herramientas independientes:

- **Carteles de precio:** crea una hoja por oferta, permite mover sus objetos y exportar productos guardados en lote.
- **Folletos:** compone piezas A4/A5 verticales u horizontales con múltiples productos, imágenes, descuentos, precios anteriores, logo, imagen de cabecera y texto legal.

La interfaz utiliza la identidad visual negro/verde de **El Rincón de los Nietos**, inspirada en la cartelería de los locales. El generador de folletos incluye nueve estilos visuales —tres de ellos exclusivos de la marca—, paleta totalmente editable, grillas de 2 a 4 columnas, controles de separación y bordes, productos duplicables y vista previa permanente. La exportación genera un PDF con las mismas dimensiones y composición visibles en pantalla.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abrí la URL que informa Vite en la terminal.

## Build de producción

```bash
npm run build
npm run preview
```

El build queda en `dist/`. `npm run build` solo genera los archivos: no inicia un servidor. Para comprobarlo, abrí la URL que muestra `npm run preview`; no abras `dist/index.html` directamente con `file://`, porque los módulos del navegador necesitan servirse por HTTP.

### Publicar en grupolosnietos.com.ar/precios/

La aplicación está configurada para ese subdirectorio. En el servidor se debe publicar **el contenido de `dist/`**, no los archivos fuente del repositorio:

```bash
npm ci
npm run build
sudo mkdir -p /var/www/grupolosnietos/precios
sudo rm -rf /var/www/grupolosnietos/precios/*
sudo cp -a dist/. /var/www/grupolosnietos/precios/
sudo chown -R www-data:www-data /var/www/grupolosnietos/precios
sudo find /var/www/grupolosnietos -type d -exec chmod 755 {} \;
sudo find /var/www/grupolosnietos -type f -exec chmod 644 {} \;
sudo systemctl reload apache2
```

> Si tu `DocumentRoot` real es otro, cambiá `/var/www/grupolosnietos` por la carpeta que muestre Apache con `apachectl -S`.

Después, `https://grupolosnietos.com.ar/precios/` debe entregar el `index.html` compilado, que referencia archivos bajo `/precios/assets/`. Si el HTML publicado contiene `/src/main.jsx`, se copió el proyecto fuente en vez del build y la página quedará en blanco.

### Error 403: “You don't have permission to access this resource.”

Ese error es de Apache, no de React. Significa que el servidor no puede leer la carpeta publicada o que el virtual host no permite servir `/precios/`. Revisá estos puntos en Ubuntu:

1. Confirmá cuál es el `DocumentRoot` activo:

```bash
sudo apachectl -S
```

2. Verificá que el build exista dentro de la carpeta pública y que no esté el código fuente:

```bash
find /var/www/grupolosnietos/precios -maxdepth 2 -type f | sort | head -30
cat /var/www/grupolosnietos/precios/index.html | sed -n '1,30p'
```

El archivo correcto debe tener referencias a `/precios/assets/...`, no a `/src/main.jsx`.

3. Aplicá permisos de lectura/ejecución para Apache:

```bash
sudo chown -R www-data:www-data /var/www/grupolosnietos/precios
sudo find /var/www/grupolosnietos -type d -exec chmod 755 {} \;
sudo find /var/www/grupolosnietos -type f -exec chmod 644 {} \;
```

4. Asegurate de que el virtual host permita acceder al directorio. En el archivo del sitio, por ejemplo `/etc/apache2/sites-available/grupolosnietos.conf`, debe existir un bloque similar:

```apache
<VirtualHost *:80>
  ServerName grupolosnietos.com.ar
  DocumentRoot /var/www/grupolosnietos

  <Directory /var/www/grupolosnietos>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

Si usás HTTPS, el mismo bloque `<Directory ...>` también debe estar disponible para el virtual host de `:443`.

5. Habilitá `rewrite` y recargá Apache para que funcione el `.htaccess` incluido en el build:

```bash
sudo a2enmod rewrite
sudo apachectl configtest
sudo systemctl reload apache2
```

6. Probá desde el servidor:

```bash
curl -I https://grupolosnietos.com.ar/precios/
curl -s https://grupolosnietos.com.ar/precios/ | sed -n '1,30p'
```

Si sigue apareciendo `403`, mirá el motivo exacto en el log:

```bash
sudo tail -n 80 /var/log/apache2/error.log
```

## Uso

- Editá producto, precio, tamaño, texto del cartel rojo, texto llamativo y forma del sello.
- Elegí cualquier color para el fondo de la hoja, los bordes, el cartel de oferta, el sello, su fondo, el precio y el nombre del producto.
- Partí de 10 plantillas llamativas para almacén, incluyendo oferta clásica, 2×1, combo, mayorista, liquidación, neón, frescos, fin de semana, black promo y moderna.
- Las plantillas 2×1 y Combo habilitan campos específicos para sumar un segundo producto o todos los productos que formen el combo.
- Explorá las plantillas como una galería visual, con filtros de favoritas, nuevas y ofertas.
- Personalizá el nombre del negocio (por defecto, “El Rincon De Los Nietos”) y agregá opcionalmente una imagen del producto.
- Ajustá el tamaño de la imagen y activá opcionalmente la eliminación automática de fondos lisos, procesada íntegramente en el navegador.
- Mové el cartel de oferta, el sello, el precio y el producto arrastrándolos con el mouse o con una pantalla táctil; las posiciones también se conservan al guardar y exportar.
- La vista previa se actualiza automáticamente y achica precio/nombre cuando son largos para que no sobresalgan.
- En pantallas grandes, la vista previa permanece visible y acompaña el desplazamiento por el formulario.
- Indicá la cantidad de copias del producto actual antes de exportar.
- Usá **Guardar** para acumular distintos productos; al generar PDF se exportan todos los productos guardados, respetando sus copias, y luego la lista se limpia automáticamente.
- Si no hay productos guardados, el PDF se genera con el producto que está en pantalla.
- `Enter` genera el PDF.
- `Ctrl + P` abre la impresión.
- El crédito “Web Desarrollada por Tomas Victola” se muestra en la página, no dentro de la hoja imprimible.
- El último tamaño elegido queda guardado en el navegador.
