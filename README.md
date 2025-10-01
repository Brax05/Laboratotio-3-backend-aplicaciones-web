# Mi Gestor de Tareas

Proyecto backend con Flask y SQLite y frontend con React para gestión de tareas con autenticación JWT.

---

## Requisitos Previos

- Python 3.8+
- Node.js y npm
- Virtualenv (opcional pero recomendado)

---

## Backend (Flask + SQLite)

### Instalación y ejecución

1. Crear y activar entorno virtual:

python -m venv venv
source venv/bin/activate # Linux/MacOS
venv\Scripts\activate # Windows

text

2. Instalar dependencias:

pip install -r requirements.txt

text

3. Crear archivo `.env` con clave JWT:

JWT_SECRET_KEY=tu_clave_secreta

text

4. Ejecutar backend:

python app.py

text

Servidor por defecto en http://localhost:5000

---

## Frontend (React)

### Instalación y ejecución

1. Dentro de la carpeta frontend (por ejemplo `frontend/`):

npm install
npm start


si hay problemas 
react-scripts.js: not found
se elimina rm -rf node_modules package-lock.json
 e reinstalar
 npm start

text

El frontend corre en http://localhost:3000

---

### Corrección visual y mejora interfaz

Para mejorar la apariencia y usabilidad del Dashboard frontend, sigue estas recomendaciones:

1. Añade estilos CSS básicos para que los inputs, botones y listas se vean limpios y ordenados.

Ejemplo en `src/App.css` o `Dashboard.css`:

input[type="text"] {
padding: 8px;
margin: 8px 8px 8px 0;
font-size: 1em;
border: 1px solid #ccc;
border-radius: 4px;
}

button {
padding: 8px 12px;
margin: 8px 8px 8px 0;
border: none;
background-color: #007bff;
color: white;
border-radius: 4px;
cursor: pointer;
}

button:hover {
background-color: #0056b3;
}

ul {
list-style: none;
padding: 0;
}

li {
margin: 12px 0;
border-bottom: 1px solid #ddd;
padding-bottom: 8px;
}

text

2. Usa contenedores para agrupar los formularios y listas con márgenes y anchos controlados.

3. Puedes integrar un framework CSS ligero como [Bulma](https://bulma.io/) o [TailwindCSS](https://tailwindcss.com/) para estilos más rápidos y responsivos.

---

### Estructura del componente Dashboard

Revisa que el componente `Dashboard.js` contenga:

- Formulario con inputs para título y descripción.
- Botones para crear, actualizar estado y eliminar tareas.
- Manejo de errores y mensajes para el usuario.
- Listado claro de tareas mostrando título, descripción y estado.

---
