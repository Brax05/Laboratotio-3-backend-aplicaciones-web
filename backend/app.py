from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# Configurar base de datos SQLite local
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mi_gestor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Modelos de base de datos
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    tasks = db.relationship('Task', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    status = db.Column(db.String(50), default='Sin iniciar')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Crear tablas
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "API Flask activa con SQLite"

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if User.query.filter_by(email=email).first():
        return jsonify(msg='Email ya registrado'), 409

    user = User(email=email, name=name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify(msg='Usuario registrado'), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token), 200

    return jsonify(msg='Email o contraseña incorrectos'), 401

@app.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.json
    title = data.get('title')
    description = data.get('description', '')

    task = Task(title=title, description=description, user_id=int(user_id))
    db.session.add(task)
    db.session.commit()

    return jsonify(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        user_id=task.user_id,
    ), 201

@app.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=int(user_id)).all()
    tasks_list = [{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'user_id': task.user_id,
    } for task in tasks]

    return jsonify(tasks_list), 200

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=int(user_id)).first()
    if not task:
        return jsonify(msg='Tarea no encontrada'), 404

    data = request.json
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)

    db.session.commit()

    return jsonify(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        user_id=task.user_id,
    ), 200

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=int(user_id)).first()
    if not task:
        return jsonify(msg='Tarea no encontrada'), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify(msg='Tarea eliminada'), 200

if __name__ == '__main__':
    app.run(debug=True)
