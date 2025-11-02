Laboratorio 3: Backend y Frontend para Aplicaciones Web
Introducción

Este proyecto consiste en el desarrollo de una aplicación web completa, que integra un backend implementado en Python (Flask) y un frontend desarrollado en React.
El objetivo es comprender la interacción entre ambos componentes dentro de un entorno web moderno, así como el proceso de despliegue en una plataforma en la nube.

Estructura del Proyecto

El repositorio se encuentra dividido en dos carpetas principales:

Carpeta	Descripción
backend/	Contiene la API RESTful desarrollada con Flask.
frontend/	Contiene la interfaz de usuario desarrollada con React.
Backend (API Flask)
Descripción General

El backend es una aplicación desarrollada con Flask, utilizando SQLite como base de datos por defecto.
En entornos de producción, puede ejecutarse con Gunicorn y se recomienda reemplazar SQLite por una base de datos persistente como PostgreSQL o MongoDB.

Despliegue en Railway

Crear un nuevo servicio en Railway y seleccionar:

“Deploy from GitHub Repo”, o

“Deploy from a Monorepo”.

Configurar el Root Directory del servicio como:

backend/


Este paso es esencial para que Railway detecte los archivos requirements.txt y Procfile correspondientes al backend.

Agregar las siguientes variables de entorno:

Variable	Valor de Ejemplo	Descripción
JWT_SECRET_KEY	tu_clave_secreta_segura	Clave secreta utilizada para la generación de tokens JWT.

El archivo Procfile define el comando de ejecución para el despliegue:

web: gunicorn app:app

Frontend (Aplicación React)
Descripción General

El frontend corresponde a una aplicación creada con React, que consume la API proporcionada por el backend.
Permite al usuario interactuar con la aplicación mediante una interfaz dinámica e intuitiva.

Despliegue en Railway

Crear un segundo servicio en Railway (dentro del mismo proyecto).

Configurar el Root Directory del servicio como:

frontend/


Agregar la siguiente variable de entorno:

Variable	Valor de Ejemplo	Descripción
REACT_APP_API_URL	https://nombre-de-tu-backend.up.railway.app/api	URL base de la API del backend.

Una vez desplegado el backend, reemplazar el valor de REACT_APP_API_URL con la URL pública generada por Railway.

Tecnologías Utilizadas

Backend:

Python (Flask)

SQLite / PostgreSQL

JWT (Autenticación)

Gunicorn (Servidor WSGI)

Frontend:

React (con Vite)

Tailwind CSS

Axios (para consumo de la API)
