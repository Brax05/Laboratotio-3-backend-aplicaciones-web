Mi Gestor de Tareas - API Backend
Este es el repositorio del backend (API) para el proyecto "Mi Gestor de Tareas". Esta API está construida con Flask y MongoDB, y se encarga de gestionar la autenticación de usuarios y las operaciones CRUD (Crear, Leer, Actualizar, Borrar) de las tareas.

🚀 Stack de Tecnologías
Backend
Flask: Framework principal de Python.

MongoDB: Base de datos NoSQL.

PyMongo: Driver oficial para conectar Python con MongoDB.

Flask-JWT-Extended: Para la autenticación usando JSON Web Tokens (JWT).

Flask-Bcrypt: Para el hasheo seguro de contraseñas.

Flask-Cors: Para manejar el Cross-Origin Resource Sharing (CORS).

Gunicorn: (Recomendado) Servidor WSGI para producción.

Frontend
Bootstrap: (Mencionado) Framework de UI/CSS.

(Probablemente HTML, CSS, y JavaScript o un framework como React/Vue).

⚙️ Configuración para Desarrollo Local
Sigue estos pasos para correr el proyecto en tu máquina local.

1. Prerrequisitos
Python 3.10 o superior.

Una instancia local de MongoDB o una cuenta gratuita en MongoDB Atlas.

2. Clonar el Repositorio
Bash

git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO>
3. Crear un Entorno Virtual
Bash

# Crear el entorno
python -m venv venv

# Activar en Windows
.\venv\Scripts\activate

# Activar en macOS/Linux
source venv/bin/activate
4. Instalar Dependencias
Asegúrate de tener todas estas librerías en tu archivo requirements.txt:

Flask
Flask-JWT-Extended
Flask-Cors
Flask-Bcrypt
pymongo
python-dotenv
gunicorn
werkzeug<3.0.0
Luego, instálalas:

Bash

pip install -r requirements.txt
5. Configurar Variables de Entorno
Crea un archivo llamado .env en la raíz del proyecto y añade las siguientes variables:

Fragmento de código

# URL de conexión a tu base de datos MongoDB (local o de Atlas)
MONGO_URI="mongodb://localhost:27017/mi_gestor"

# Clave secreta para firmar los tokens JWT (puede ser cualquier string aleatorio)
JWT_SECRET_KEY="tu-clave-secreta-super-segura"
6. Ejecutar la Aplicación
Bash

python app.py
La API estará corriendo en http://localhost:5000 (o el puerto por defecto de Flask).
