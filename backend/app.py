from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from bson import ObjectId
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv

# ------------------ CARGAR VARIABLES DE ENTORNO ------------------
load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'clave-secreta')

# ------------------ CONEXIÓN A MONGODB ------------------
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mi_gestor')

# --- Manejo de la conexión ---
try:
    client = MongoClient(mongo_uri)
    # Probar la conexión
    client.server_info() 
    print("✅ Conexión a MongoDB exitosa.")
except Exception as e:
    print(f"Error conectando a MongoDB: {e}")
    client = None

# Seleccionar la base de datos y colecciones
if client:
    db = client.get_database() # O usa client['mi_gestor'] si el nombre de la DB no está en la URI
    users = db.users
    tasks = db.tasks
else:
    print("FATAL: No se pudo conectar a la base de datos. La aplicación no funcionará.")
    # Podrías querer que la app falle aquí, pero la dejaremos seguir para ver el error en la raíz

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ------------------ CONFIGURACIÓN DE CORS (CORREGIDA) ------------------
# Lee la URL del frontend (Vercel) desde las variables de entorno.
# Si no existe, usa localhost:3000 como valor por defecto.
frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')

# Lista de orígenes permitidos
allowed_origins = [frontend_url]

# Asegúrate de que localhost esté en la lista si no es la URL del frontend
if 'http://localhost:3000' not in allowed_origins:
    allowed_origins.append('http://localhost:3000')

print(f"Orígenes CORS permitidos: {allowed_origins}")

CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

# ------------------ RUTA BASE ------------------
@app.route('/')
def home():
    if client:
        return "✅ API Flask activa con MongoDB"
    else:
        return "❌ ERROR: No se pudo conectar a la API. Revisa la conexión a MongoDB."

# ------------------ AUTENTICACIÓN ------------------
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password or not name:
        return jsonify(msg='Faltan campos requeridos'), 400

    if users.find_one({'email': email}):
        return jsonify(msg='Email ya registrado'), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Corregido: El campo se llama 'password_hash' en el login
    user_id = users.insert_one({
        'email': email,
        'password_hash': hashed_pw, # Cambiado de 'password' a 'password_hash'
        'name': name
    }).inserted_id

    return jsonify(msg='Usuario registrado', id=str(user_id)), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({'email': email})
    
    # Corregido: Comprobar contra 'password_hash'
    if user and bcrypt.check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=access_token), 200

    return jsonify(msg='Email o contraseña incorrectos'), 401

# ------------------ CRUD DE TAREAS ------------------
@app.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.json
    title = data.get('title')
    description = data.get('description', '')

    if not title:
        return jsonify(msg='El título es obligatorio'), 400

    task = {
        'title': title,
        'description': description,
        'status': 'Sin iniciar',
        'user_id': ObjectId(user_id)
    }

    result = tasks.insert_one(task)
    task['_id'] = str(result.inserted_id)
    task['user_id'] = user_id

    return jsonify(task), 201


@app.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = ObjectId(get_jwt_identity())
    user_tasks = tasks.find({'user_id': user_id})

    task_list = []
    for t in user_tasks:
        task_list.append({
            'id': str(t['_id']),
            'title': t['title'],
            'description': t.get('description', ''),
            'status': t.get('status', 'Sin iniciar'),
            'user_id': str(t['user_id'])
        })

    return jsonify(task_list), 200


@app.route('/api/tasks/<string:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = ObjectId(get_jwt_identity())
    data = request.json
    
    # Filtrar campos vacíos para no sobrescribir con None
    update_data = {}
    if data.get('title') is not None:
        update_data['title'] = data.get('title')
    if data.get('description') is not None:
        update_data['description'] = data.get('description')
    if data.get('status') is not None:
        update_data['status'] = data.get('status')
    
    if not update_data:
        return jsonify(msg='No hay datos para actualizar'), 400

    result = tasks.update_one(
        {'_id': ObjectId(task_id), 'user_id': user_id},
        {'$set': update_data}
    )

    if result.matched_count == 0:
        return jsonify(msg='Tarea no encontrada'), 404

    return jsonify(msg='Tarea actualizada'), 200


@app.route('/api/tasks/<string:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = ObjectId(get_jwt_identity())

    result = tasks.delete_one({'_id': ObjectId(task_id), 'user_id': user_id})
    if result.deleted_count == 0:
        return jsonify(msg='Tarea no encontrada'), 404

    return jsonify(msg='Tarea eliminada'), 200

# ------------------ MAIN ------------------
if __name__ == '__main__':
    app.run(debug=True)
