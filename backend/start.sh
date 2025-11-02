#!/bin/bash
 
# Este script es para forzar la detección del lenguaje Python
# y ejecutar el comando de inicio definido en el Procfile.
 
# Instalar dependencias
pip install -r requirements.txt
 
# Ejecutar el comando web del Procfile
exec gunicorn app:app
