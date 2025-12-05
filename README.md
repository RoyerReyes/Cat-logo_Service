# 🚀 Catálogo de Servicios - Google Cloud Ops

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Aplicación web moderna y dinámica para gestionar y visualizar servicios de Google Cloud Platform con sistema de soporte integrado.

## ✨ Características Principales

### 🎯 Catálogo de Servicios
- **Compute Engine**: Gestión de máquinas virtuales
- **Kubernetes Engine**: Orquestación de contenedores
- **Cloud SQL**: Bases de datos administradas
- **Cloud Storage**: Almacenamiento de objetos
- **IAM**: Control de identidad y accesos

### 🎫 Sistema de Tickets
- Creación de incidentes con formulario completo
- Gestión de tickets con prioridades (P1, P2, P3)
- Visualización de tickets en tabla interactiva
- Monitoreo de incidentes críticos (P1)
- Almacenamiento local con LocalStorage

### 🌟 Funcionalidades Avanzadas
- ⭐ **Sistema de Favoritos**: Guarda tus servicios favoritos
- 🔍 **Búsqueda en Tiempo Real**: Filtra servicios instantáneamente
- 📊 **Dashboard de Métricas**: Visualiza estadísticas en tiempo real
- 🍞 **Breadcrumbs**: Navegación contextual mejorada
- 🔔 **Notificaciones Toast**: Feedback visual de acciones
- ⚡ **Loading States**: Indicadores de carga para mejor UX
- 📱 **Responsive Design**: Totalmente adaptable a móviles
- 🍔 **Menú Hamburguesa**: Navegación móvil optimizada
- ♿ **Accesibilidad**: ARIA labels y navegación por teclado
- 💾 **PWA Ready**: Configuración básica de Progressive Web App

## 🎨 Interfaz de Usuario

### Diseño Moderno
- Tema oscuro profesional
- Colores de marca Google Cloud
- Animaciones suaves y transiciones
- Efectos hover interactivos
- Iconos SVG para cada servicio

### Experiencia de Usuario
- Navegación intuitiva
- Feedback inmediato en todas las acciones
- Estados de carga visuales
- Mensajes de error y éxito claros
- Confirmaciones antes de acciones destructivas

## 📁 Estructura del Proyecto

```
web calidad/
│
├── index.html                 # Página principal
├── manifest.json             # Configuración PWA
│
├── assets/                   # Recursos estáticos
│   ├── images/              # Imágenes y logos
│   │   └── google-cloud-logo.svg
│   └── icons/               # Iconos de servicios
│       ├── compute.svg
│       ├── kubernetes.svg
│       ├── database.svg
│       └── storage.svg
│
├── css/                      # Estilos
│   └── styles.css           # Hoja de estilos principal
│
├── js/                       # JavaScript
│   ├── config.js            # Configuración de la aplicación
│   └── app-simple.js        # Lógica principal mejorada
│
└── README.md                 # Documentación
```

## 🚀 Instalación y Uso

### Método 1: Apertura Directa
1. Descarga o clona el proyecto
2. Abre `index.html` en tu navegador moderno
3. ¡Listo! No requiere servidor ni instalación

### Método 2: Servidor Local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000

# Luego abre http://localhost:8000
```

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con variables CSS y animaciones
- **JavaScript ES6+**: Lógica moderna con clases y módulos

### Características Técnicas
- **LocalStorage**: Persistencia de datos del lado del cliente
- **Responsive Design**: Media queries para adaptabilidad
- **Accessibility (a11y)**: ARIA labels y navegación por teclado
- **Progressive Enhancement**: Funciona sin JavaScript básico

## 🎯 Funcionalidades Detalladas

### 1. Gestión de Servicios
```javascript
// Visualiza información detallada de cada servicio
- Descripción completa
- Estado operativo
- Características principales
- Métricas en tiempo real
- Iconos identificativos
```

### 2. Sistema de Tickets
```javascript
// Crea y gestiona incidentes
- Título descriptivo
- Servicio afectado
- Nivel de prioridad (P1, P2, P3)
- Descripción detallada
- Email de contacto
- Timestamp automático
- ID único generado
```

### 3. Favoritos
```javascript
// Guarda tus servicios más usados
- Click en estrella para agregar/quitar
- Sección dedicada en el sidebar
- Persistencia con LocalStorage
- Acceso rápido
```

### 4. Búsqueda
```javascript
// Encuentra servicios instantáneamente
- Búsqueda por nombre
- Búsqueda por descripción
- Filtrado en tiempo real
- Sin resultados? Notificación amigable
```

### 5. Dashboard
```javascript
// Visualiza el estado general
- Uptime de todos los servicios
- Estadísticas de tickets
- Métricas globales
- Última actualización
```

## 🎨 Personalización

### Colores (en CSS)
```css
:root {
    --primary-blue: #4285f4;      /* Azul Google */
    --primary-red: #ea4335;       /* Rojo Google */
    --primary-yellow: #fbbc04;    /* Amarillo Google */
    --primary-green: #34a853;     /* Verde Google */
    --bg-dark: #0f172a;           /* Fondo oscuro */
    --bg-card: #1e293b;           /* Fondo de tarjetas */
}
```

### Agregar Nuevo Servicio
1. Edita `js/app-simple.js`
2. Agrega el servicio en `servicesData`:
```javascript
nuevoServicio: {
    title: 'Nombre del Servicio',
    description: 'Descripción completa',
    icon: 'assets/icons/icono.svg',
    status: 'Operativo',
    features: [
        'Característica 1',
        'Característica 2',
        'Característica 3'
    ]
}
```
3. Agrega el elemento HTML en el sidebar

## 📊 Datos Almacenados

### LocalStorage Keys
- `cloudTickets`: Todos los tickets creados
- `cloudFavorites`: IDs de servicios favoritos

### Formato de Ticket
```json
{
    "id": "TICKET-1234567890",
    "title": "Error en Compute Engine",
    "service": "Compute Engine",
    "priority": "P1",
    "description": "Descripción del problema",
    "email": "usuario@ejemplo.com",
    "fecha": "05/12/2025",
    "estado": "Abierto"
}
```

## 🔧 Navegadores Compatibles

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## ♿ Accesibilidad

- ✅ Navegación completa por teclado
- ✅ ARIA labels en elementos interactivos
- ✅ Roles semánticos apropiados
- ✅ Alto contraste para legibilidad
- ✅ Focus visible en elementos
- ✅ Textos alt en imágenes

## 📱 Responsive Breakpoints

```css
/* Tablet y móvil */
@media (max-width: 768px) {
    - Menú hamburguesa activado
    - Sidebar en overlay
    - Tarjetas apiladas
    - Fuentes ajustadas
}

/* Móvil pequeño */
@media (max-width: 480px) {
    - Optimización adicional
    - Menor padding
    - Breadcrumbs compactos
}
```

## 🎓 Ideal Para

- ✅ Proyectos universitarios
- ✅ Portafolios profesionales
- ✅ Aprendizaje de desarrollo web
- ✅ Prototipos de dashboards
- ✅ Interfaces de administración

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de:
- Hacer fork del proyecto
- Crear nuevas características
- Mejorar el diseño
- Reportar bugs
- Sugerir mejoras

## 📝 Licencia

Proyecto educativo de código abierto - MIT License

## 👨‍💻 Autor

Desarrollado como proyecto universitario para demostrar habilidades en:
- Desarrollo Frontend moderno
- Diseño de interfaces de usuario
- Gestión de estado del lado del cliente
- Responsive Design
- Accesibilidad web
- Mejores prácticas de código

## 🌟 Características para Impresionar

Este proyecto demuestra:
- ✨ **Diseño Profesional**: Interfaz moderna y atractiva
- 🎯 **Funcionalidad Completa**: Sistema de tickets funcional
- 💾 **Persistencia de Datos**: LocalStorage para guardar información
- 📱 **Responsive Design**: Funciona perfecto en cualquier dispositivo
- ♿ **Accesibilidad**: Cumple estándares WCAG
- ⚡ **Performance**: Carga rápida y animaciones suaves
- 🎨 **UX/UI Excellence**: Experiencia de usuario excepcional
- 🔧 **Código Limpio**: Bien estructurado y comentado
- 📊 **Visualización de Datos**: Dashboard con métricas
- 🌈 **Interactividad**: Múltiples funcionalidades dinámicas

## 🎉 ¡Disfruta el Proyecto!

Si este proyecto te fue útil para tu universidad, no olvides darle una ⭐ y compartirlo con tus compañeros.

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0
**Estado**: ✅ Completo y Funcional
