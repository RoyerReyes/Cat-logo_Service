# 🔧 Solución: Los Estilos No Cargan en GitHub Pages

## 🚨 Problema Identificado

Los estilos CSS no cargan cuando subes el proyecto a GitHub Pages. Esto es un problema **muy común** y tiene soluciones fáciles.

---

## ✅ Soluciones (Prueba en Orden)

### Solución 1: Verificar que TODO se subió a GitHub

#### Paso 1: Verifica en GitHub.com
1. Ve a tu repositorio en GitHub.com
2. Haz click en la carpeta `css/`
3. ¿Ves el archivo `styles.css`?
   - ✅ **SÍ** → Continúa a Solución 2
   - ❌ **NO** → Sigue los pasos de abajo

#### Paso 2: Subir archivos faltantes
```bash
# En la terminal, dentro de la carpeta del proyecto:

git add css/
git add js/
git add assets/
git commit -m "Agregar archivos CSS, JS y assets"
git push
```

#### Paso 3: Espera 2-3 minutos
GitHub Pages tarda unos minutos en actualizar. Espera y recarga la página.

---

### Solución 2: Verificar Configuración de GitHub Pages

#### Paso 1: Ve a Settings
1. En tu repositorio, click en "**Settings**" (arriba derecha)
2. En el menú izquierdo, click en "**Pages**"

#### Paso 2: Verifica la configuración
- **Source**: Debe estar en "Deploy from a branch"
- **Branch**: Debe estar en `main` (o `master`) y carpeta `/ (root)`
- Click en **Save** si cambias algo

#### Paso 3: Verifica la URL
GitHub Pages te muestra la URL del sitio, algo como:
```
https://tu-usuario.github.io/nombre-repositorio/
```

**IMPORTANTE**: Si tu repositorio se llama algo como `mi-proyecto`, la URL será:
```
https://tu-usuario.github.io/mi-proyecto/
```

Y necesitas **ajustar las rutas** (ver Solución 3).

---

### Solución 3: Ajustar Rutas para Sub-carpeta

Si tu URL de GitHub Pages incluye el nombre del repositorio (como `/mi-proyecto/`), las rutas relativas pueden fallar.

#### Opción A: Usar Rutas Relativas con ./

Edita `index.html` y cambia:
```html
<!-- ANTES -->
<link rel="stylesheet" href="css/styles.css">
<script src="js/app-simple.js"></script>

<!-- DESPUÉS -->
<link rel="stylesheet" href="./css/styles.css">
<script src="./js/app-simple.js"></script>
```

#### Opción B: Usar el nombre del repositorio en las rutas

Si tu repo se llama `google-cloud-catalog`, cambia las rutas a:
```html
<link rel="stylesheet" href="/google-cloud-catalog/css/styles.css">
<script src="/google-cloud-catalog/js/app-simple.js"></script>
```

⚠️ **MEJOR**: Usa la Opción A (rutas relativas con `./`)

---

### Solución 4: Renombrar Repositorio (RECOMENDADO)

La forma **MÁS FÁCIL** es renombrar tu repositorio para que GitHub Pages use la URL principal:

#### Paso 1: Renombrar
1. Ve a tu repositorio en GitHub
2. Click en "**Settings**"
3. En "Repository name", cámbialo a: `tu-usuario.github.io`
   - Ejemplo: Si tu usuario es `juan123`, ponle `juan123.github.io`
4. Click en "Rename"

#### Paso 2: Espera
- Espera 2-3 minutos
- Tu sitio ahora estará en: `https://tu-usuario.github.io/`
- ¡Las rutas relativas funcionarán perfectamente!

---

### Solución 5: Verificar Mayúsculas/Minúsculas

GitHub es **case-sensitive** (distingue mayúsculas de minúsculas).

Verifica que:
- La carpeta se llama `css` (minúsculas), no `CSS` o `Css`
- El archivo se llama `styles.css`, no `Styles.css`
- Las rutas en HTML coinciden exactamente

---

### Solución 6: Crear archivo index.html en la raíz

Asegúrate de que `index.html` esté en la **carpeta raíz** del repositorio, no en una subcarpeta.

Estructura correcta:
```
tu-repositorio/
├── index.html          ← DEBE estar aquí
├── css/
│   └── styles.css
├── js/
│   └── app-simple.js
└── assets/
```

Estructura INCORRECTA:
```
tu-repositorio/
└── web-calidad/        ← NO debe estar en subcarpeta
    ├── index.html
    ├── css/
    └── js/
```

Si está en subcarpeta, **mueve todo a la raíz**:
```bash
# Mover archivos a la raíz
mv "web calidad"/* .
git add .
git commit -m "Mover archivos a raíz"
git push
```

---

## 🔍 Diagnóstico: ¿Cuál es TU Problema?

### Prueba 1: Abre la Consola del Navegador
1. Ve a tu sitio en GitHub Pages
2. Presiona **F12** (DevTools)
3. Ve a la pestaña "**Console**"
4. ¿Ves errores rojos? Léelos

#### Errores Comunes:

**Error**: `Failed to load resource: 404 (Not Found) css/styles.css`
- **Causa**: El archivo no se subió a GitHub o está en otra carpeta
- **Solución**: Verifica en GitHub.com que el archivo exista

**Error**: `Failed to load resource: 404 (Not Found) /nombre-repo/css/styles.css`
- **Causa**: GitHub Pages busca en subcarpeta por el nombre del repo
- **Solución**: Usa rutas relativas con `./` (Solución 3A)

**Error**: `Refused to apply style... MIME type 'text/plain'`
- **Causa**: GitHub Pages no reconoce el archivo como CSS
- **Solución**: Verifica que el archivo termine en `.css`

---

## ✅ Checklist de Verificación

Antes de pedir más ayuda, verifica:

- [ ] El archivo `css/styles.css` existe en GitHub.com
- [ ] El archivo `js/app-simple.js` existe en GitHub.com
- [ ] La carpeta `assets/` con imágenes existe en GitHub.com
- [ ] GitHub Pages está **activado** en Settings → Pages
- [ ] La branch es `main` o `master`
- [ ] Esperaste 2-3 minutos después del último push
- [ ] Las rutas en `index.html` usan `./` al inicio
- [ ] No hay errores 404 en la consola (F12)
- [ ] `index.html` está en la raíz del repositorio

---

## 🚀 Solución Rápida (90% de los casos)

La mayoría de las veces, el problema se soluciona con estos pasos:

### Paso 1: Edita index.html
Cambia la línea 15 de:
```html
<link rel="stylesheet" href="css/styles.css">
```

A:
```html
<link rel="stylesheet" href="./css/styles.css">
```

Y la línea 295 (final del archivo) de:
```html
<script src="js/app-simple.js"></script>
```

A:
```html
<script src="./js/app-simple.js"></script>
```

### Paso 2: Guarda y Sube
```bash
git add index.html
git commit -m "Corregir rutas para GitHub Pages"
git push
```

### Paso 3: Espera 2 minutos
- Espera que GitHub Pages se actualice
- Recarga la página con **Ctrl + Shift + R** (borra caché)
- ¡Debería funcionar!

---

## 🆘 Si NADA Funciona

Si probaste TODO y aún no funciona, haz esto:

### Opción 1: Comparte tu repositorio
Dame el link de tu repositorio de GitHub (ejemplo: `github.com/tu-usuario/tu-repo`) y te ayudo específicamente.

### Opción 2: Usa Netlify o Vercel
Si GitHub Pages sigue dando problemas, puedes usar alternativas GRATIS:

#### Netlify (Más Fácil):
1. Ve a [netlify.com](https://netlify.com)
2. Regístrate gratis
3. Click en "Add new site" → "Import an existing project"
4. Conecta tu repositorio de GitHub
5. Click en "Deploy"
6. ¡Listo! Te da una URL que funciona perfectamente

#### Vercel:
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate gratis
3. Click en "Add New" → "Project"
4. Importa tu repositorio
5. Click en "Deploy"
6. ¡Funciona al instante!

---

## 📝 Ejemplo de Comandos Completos

Si quieres hacer todo de una vez:

```bash
# 1. Asegúrate de estar en la carpeta correcta
cd "ruta/a/tu/proyecto"

# 2. Agrega TODOS los archivos
git add .

# 3. Haz commit
git commit -m "Actualizar proyecto con rutas corregidas"

# 4. Sube a GitHub
git push origin main

# 5. Espera 2-3 minutos y recarga tu sitio
```

---

## 🎯 Resultado Esperado

Después de aplicar las soluciones, cuando vayas a tu sitio de GitHub Pages deberías ver:
- ✅ Tema oscuro aplicado
- ✅ Logo de Google Cloud visible
- ✅ Menú lateral con estilos
- ✅ Animaciones funcionando
- ✅ Botones con colores
- ✅ Sin errores en consola (F12)

---

## 💡 Tips Extras

1. **Siempre usa `./` en las rutas** - Es la mejor práctica
2. **Verifica en GitHub.com primero** - Asegúrate que todo se subió
3. **Espera 2-3 minutos** - GitHub Pages no es instantáneo
4. **Usa Ctrl + Shift + R** - Para recargar sin caché
5. **Revisa la consola (F12)** - Los errores te dicen exactamente qué falta

---

## 🔗 Links Útiles

- [Documentación oficial de GitHub Pages](https://docs.github.com/pages)
- [Solucionar problemas de GitHub Pages](https://docs.github.com/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
- [Tutorial de rutas relativas](https://www.w3schools.com/html/html_filepaths.asp)

---

## ✅ ¿Ya Funciona?

Si solucionaste el problema, ¡excelente! Ahora puedes:
- Compartir el link de tu proyecto
- Mostrarlo en tu CV
- Presentarlo en la universidad
- Agregarlo a tu portafolio

**¡Mucha suerte con tu proyecto!** 🚀

---

**Última actualización**: Diciembre 2025
