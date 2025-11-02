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
# Usa flask_pymongo si lo tienes, si no usa pymongo directamente
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mi_gestor')
client = MongoClient(mongo_uri)
db = client.get_database()
users = db.users
tasks = db.tasks

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# ------------------ RUTA BASE ------------------
@app.route('/')
def home():
    return "✅ API Flask activa con MongoDB"

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
    user_id = users.insert_one({
        'email': email,
        'password': hashed_pw,
        'name': name
    }).inserted_id

    return jsonify(msg='Usuario registrado', id=str(user_id)), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):
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

    result = tasks.update_one(
        {'_id': ObjectId(task_id), 'user_id': user_id},
        {'$set': {
            'title': data.get('title'),
            'description': data.get('description'),
            'status': data.get('status')
        }}
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
