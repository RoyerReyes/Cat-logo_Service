# 📚 Guía de Uso - Catálogo de Servicios Google Cloud Ops

## 🚀 Inicio Rápido

1. **Abrir la aplicación**: Haz doble clic en `index.html`
2. La aplicación se abrirá en tu navegador predeterminado
3. No requiere instalación ni configuración adicional

## 📋 Funcionalidades Implementadas

### ✅ 1. Visualización de Servicios
- **Compute Engine**: Máquinas virtuales escalables
- **Kubernetes Engine**: Orquestación de contenedores
- **Cloud SQL**: Bases de datos administradas
- **Cloud Storage**: Almacenamiento de objetos
- **IAM**: Gestión de identidad y acceso

Cada servicio muestra:
- Descripción detallada
- Estado operativo
- Características principales
- Icono representativo

### ✅ 2. Sistema de Tickets FUNCIONAL

#### Crear Incidente:
1. Click en "Crear Incidente" en el menú lateral
2. Completa el formulario:
   - Título del incidente
   - Servicio afectado
   - Prioridad (P1, P2, P3)
   - Descripción detallada
   - Email de contacto
3. Click en "Crear Incidente"
4. El sistema genera automáticamente un ID único
5. Notificación de confirmación
6. Redirección automática a "Mis Incidentes"

#### Mis Incidentes:
- Lista completa de todos los tickets registrados
- Tabla organizada con:
  - ID del ticket
  - Título
  - Servicio afectado
  - Prioridad (con badge de color)
  - Estado
  - Fecha de creación
  - Botón para eliminar
- Los datos se guardan en LocalStorage (persisten al cerrar el navegador)

#### Incidentes P1 (Críticos):
- Filtrado automático de tickets críticos
- Vista especial para monitoreo de emergencias
- Contador de incidentes activos

### ✅ 3. Dashboard de Estado
- Estado de todos los servicios
- Estadísticas de tickets:
  - Total de tickets
  - Tickets P1 (críticos)
  - Tickets P2 (altos)
  - Tickets P3 (normales)
- Indicador de salud del sistema
- Última actualización en tiempo real

### ✅ 4. Sistema de Notificaciones
- Notificaciones toast en la esquina superior derecha
- Tipos: Success, Info, Error
- Desaparecen automáticamente después de 3 segundos
- Feedback visual para todas las acciones

### ✅ 5. Diseño Profesional
- ✨ Logo de Google Cloud
- 🎨 Iconos SVG personalizados para cada servicio
- 🎭 Animaciones suaves
- 📱 Diseño responsive (funciona en móviles)
- 🌙 Tema oscuro profesional
- ⚡ Transiciones y efectos hover

## 🎯 Casos de Uso

### Caso 1: Registrar un Problema Crítico
```
1. Click en "Crear Incidente"
2. Título: "Base de datos inaccesible"
3. Servicio: "Cloud SQL"
4. Prioridad: "P1 - Crítico"
5. Descripción: "La base de datos principal no responde desde las 14:00"
6. Email: "admin@empresa.com"
7. Crear → El ticket aparece en "Mis Incidentes" y "Incidente P1"
```

### Caso 2: Consultar Estado de Servicios
```
1. Click en cualquier servicio del menú
2. Ver información detallada
3. Estado operativo
4. Características
```

### Caso 3: Monitorear Incidentes
```
1. Click en "Status Dashboard"
2. Ver resumen general
3. Estadísticas de tickets por prioridad
4. Estado de todos los servicios
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS y animaciones
- **JavaScript ES6**: Funcionalidad con LocalStorage
- **SVG**: Iconos vectoriales escalables

## 💾 Almacenamiento

Los tickets se guardan en LocalStorage del navegador:
- Persisten al cerrar y abrir el navegador
- Se mantienen hasta que se limpie el caché
- Funciona offline

Para limpiar todos los datos:
```javascript
localStorage.clear()
```

## 🎨 Personalización

### Cambiar Colores:
Edita `css/styles.css` en las variables CSS:
```css
:root {
    --primary-blue: #4285f4;
    --primary-red: #ea4335;
    --primary-yellow: #fbbc04;
    --primary-green: #34a853;
}
```

### Agregar Nuevo Servicio:
Edita `js/app-simple.js` en el objeto `servicesData`

## 🐛 Solución de Problemas

### Los iconos no se ven:
- Verifica que la carpeta `assets/icons/` existe
- Revisa la consola del navegador (F12)

### Los tickets no se guardan:
- Asegúrate de completar todos los campos obligatorios
- Verifica que LocalStorage esté habilitado en tu navegador

### La página no carga:
- Abre con un navegador moderno (Chrome, Firefox, Edge)
- Revisa la consola (F12) para ver errores

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 🚀 Próximas Mejoras Posibles

- [ ] Integración con API real de Google Cloud
- [ ] Autenticación de usuarios
- [ ] Exportar tickets a PDF/Excel
- [ ] Gráficos de métricas
- [ ] Notificaciones push
- [ ] Modo oscuro/claro toggleable
- [ ] Búsqueda y filtrado avanzado

## 📞 Soporte

Para reportar bugs o sugerencias, consulta la documentación de Google Cloud Platform.

---

**Versión**: 1.0.0
**Última actualización**: Diciembre 2025
**Desarrollado con**: Google Cloud best practices
