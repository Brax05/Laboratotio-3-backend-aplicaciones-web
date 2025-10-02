# Mi Gestor de Tareas - Frontend

## Descripción

Aplicación web moderna para la gestión de tareas personales, desarrollada con React y Bootstrap 5. Incluye autenticación de usuarios, creación, edición y eliminación de tareas con diferentes estados.

## Características

- ✨ **Diseño Moderno**: Interfaz atractiva con Bootstrap 5 y gradientes personalizados
- 🔐 **Autenticación Segura**: Sistema de login y registro con JWT
- 📊 **Dashboard Interactivo**: Visualización de estadísticas y gestión de tareas
- 🎨 **Responsive**: Diseño adaptable a todos los dispositivos
- ⚡ **Rápido y Eficiente**: Desarrollado con React para una experiencia fluida

## Tecnologías Utilizadas

- **React 18**: Framework de JavaScript para interfaces de usuario
- **React Router DOM 6**: Navegación entre páginas
- **Bootstrap 5.3**: Framework CSS para diseño responsive
- **Bootstrap Icons**: Iconos vectoriales
- **Google Fonts (Poppins)**: Tipografía moderna

## Páginas Incluidas

### 1. Página de Inicio (Home)
- Hero section con llamado a la acción
- Sección de características destacadas
- Diseño atractivo con tarjetas y gradientes

### 2. Login
- Formulario de inicio de sesión
- Validación de campos
- Mensajes de error personalizados
- Indicador de carga durante la autenticación

### 3. Registro
- Formulario de registro de nuevos usuarios
- Validación de campos (email, contraseña mínima 6 caracteres)
- Mensajes de éxito y error
- Limpieza automática del formulario tras registro exitoso

### 4. Dashboard
- **Estadísticas en tiempo real**: Total de tareas, sin iniciar, en progreso y completadas
- **Formulario de creación**: Agregar nuevas tareas con título y descripción
- **Listado de tareas**: Visualización organizada con badges de estado
- **Filtros**: Filtrar tareas por estado (Todas, Sin iniciar, En progreso, Completadas)
- **Acciones rápidas**: Cambiar estado de tareas y eliminar con confirmación

## Instalación

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Navegar al directorio del frontend**:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Abrir en el navegador**:
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## Configuración del Backend

Asegúrate de que el backend esté ejecutándose en `http://localhost:5000`. El frontend está configurado para conectarse a esta URL por defecto.

Si necesitas cambiar la URL del backend, edita el archivo `src/api.js` y `src/components/Dashboard.js`.

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html          # HTML base con Bootstrap CDN
├── src/
│   ├── components/
│   │   ├── Home.js         # Página de inicio
│   │   ├── Login.js        # Página de login
│   │   ├── Register.js     # Página de registro
│   │   └── Dashboard.js    # Dashboard de tareas
│   ├── App.js              # Componente principal con rutas
│   ├── api.js              # Funciones para llamadas al backend
│   └── index.js            # Punto de entrada de React
├── package.json            # Dependencias y scripts
└── README.md              # Este archivo
```

## Paleta de Colores

- **Gradiente Principal**: `#667eea` → `#764ba2` (Púrpura)
- **Primary**: Bootstrap Blue (`#0d6efd`)
- **Success**: Bootstrap Green (`#198754`)
- **Warning**: Bootstrap Yellow (`#ffc107`)
- **Info**: Bootstrap Cyan (`#0dcaf0`)
- **Danger**: Bootstrap Red (`#dc3545`)

## Funcionalidades del Dashboard

### Estadísticas
- **Total**: Número total de tareas
- **Sin Iniciar**: Tareas pendientes de comenzar
- **En Progreso**: Tareas en desarrollo
- **Completadas**: Tareas finalizadas

### Gestión de Tareas
- **Crear**: Agregar nuevas tareas con título y descripción opcional
- **Actualizar Estado**: Cambiar entre "Sin iniciar", "En progreso" y "Completadas"
- **Eliminar**: Borrar tareas con confirmación
- **Filtrar**: Ver tareas según su estado

## Notas de Desarrollo

- Bootstrap se carga desde CDN para optimizar el tamaño del bundle
- Los iconos de Bootstrap Icons también se cargan desde CDN
- La fuente Poppins de Google Fonts proporciona una tipografía moderna
- El diseño es completamente responsive y se adapta a móviles, tablets y escritorio

## Próximas Mejoras

- [ ] Edición inline de tareas
- [ ] Drag & drop para reordenar tareas
- [ ] Fechas de vencimiento
- [ ] Categorías y etiquetas
- [ ] Búsqueda de tareas
- [ ] Modo oscuro

## Soporte

Para cualquier problema o sugerencia, por favor contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ usando React y Bootstrap**
