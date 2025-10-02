# Mi Gestor de Tareas

Proyecto backend con Flask y SQLite y frontend con React para gestión de tareas con autenticación JWT.

---

## Requisitos Previos

- Python 3.8+
  
-Si se en cuentra en windows descargar node.
- Node.js y npm

---

## Backend (Flask + SQLite)

### Instalación y ejecución

1. Crear y activar entorno virtual:

python -m venv venv
source venv/bin/activate # Linux
venv\Scripts\activate # Windows


2. Instalar dependencias:

pip install -r requirements.txt
los requierements son las librerias a instalar se encuantran en la carpeta del backend.


3. Crear archivo `.env` con clave JWT:

JWT_SECRET_KEY=tu_clave_secreta


4. Ejecutar backend:

python app.py

Servidor por defecto en http://localhost:5000

---

## Frontend (React)

### Instalación y ejecución

1. Dentro de la carpeta frontend (por ejemplo `frontend/`):

npm install
npm install bootstrap
npm start


si hay problemas 
react-scripts.js: not found
se elimina rm -rf node_modules package-lock.json

 e reinstalar
 npm start

text

El frontend corre en http://localhost:3000

---

