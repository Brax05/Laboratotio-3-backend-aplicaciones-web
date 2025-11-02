# Laboratorio 3: Backend y Frontend para Aplicaciones Web

Este proyecto es una aplicación web completa que incluye un **backend** desarrollado con **Python (Flask)** y un **frontend** desarrollado con **React**.


## Estructura del Proyecto

El proyecto está dividido en dos directorios principales:

*   `backend/`: Contiene la API RESTful desarrollada con Flask.
*   `frontend/`: Contiene la interfaz de usuario desarrollada con React.

### 1. Despliegue del Backend (API Flask)

El backend es una aplicación Flask que utiliza SQLite (para desarrollo) y está configurada para ser servida por Gunicorn en producción.

**Pasos CRUCIALES para el despliegue:**

1.  **Crea un nuevo servicio** en Railway y selecciona la opción **"Deploy from GitHub Repo"** o **"Deploy from a Monorepo"**.
2.  **CONFIGURACIÓN DEL MONOREPO (Paso Clave):**
    *   **DEBES** establecer el **Root Directory** (Directorio Raíz) en la configuración del servicio como:
        ```
        backend/
        ```
    *   Este paso es fundamental para que Railway solo analice el código de Python y encuentre los archivos `requirements.txt` y `Procfile`.

3.  **Variables de Entorno:**
    *   Añade la variable de entorno `JWT_SECRET_KEY` con un valor secreto y seguro (por ejemplo, una cadena aleatoria larga).
    *   **Nota sobre la Base de Datos:** El backend está configurado para usar SQLite (`sqlite:///mi_gestor.db`), lo cual **no es adecuado para entornos de producción** como Railway. **Se recomienda encarecidamente migrar a una base de datos persistente** como PostgreSQL o MongoDB, que puedes añadir como servicio en Railway.

| Variable | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- |
| `JWT_SECRET_KEY` | `tu_clave_secreta_segura` | Clave secreta para la generación de tokens JWT. |

**Comandos de Despliegue (Automático por `Procfile`):**

El archivo `backend/Procfile` indica a Railway que use el siguiente comando para iniciar el servidor:

```bash
web: gunicorn app:app
```

### 2. Despliegue del Frontend (Aplicación React)

El frontend es una aplicación React que se conecta a la API del backend.

**Pasos para el despliegue:**

1.  **Crea un segundo servicio** en Railway (en el mismo proyecto) y selecciona la opción **"Deploy from GitHub Repo"** o **"Deploy from a Monorepo"**.
2.  **CONFIGURACIÓN DEL MONOREPO (Paso Clave):**
    *   **DEBES** establecer el **Root Directory** (Directorio Raíz) en la configuración del servicio como:
        ```
        frontend/
        ```
3.  **Variables de Entorno:**
    *   Necesitas una variable de entorno para que el frontend sepa dónde está la API del backend.
    *   Una vez que el backend esté desplegado y tenga un dominio público, añade la URL de la API a la configuración del frontend.

| Variable | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | `https://nombre-de-tu-backend.up.railway.app/api` | URL base de la API del backend. |


