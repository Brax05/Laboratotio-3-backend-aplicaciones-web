import React, { useState } from 'react';
import { registerUser } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = await registerUser(name, email, password);
      setMessage(msg);
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Formulario */}
      <div className="d-flex flex-column justify-content-center w-50 p-5 bg-light">
        <div className="mx-auto w-75">
          <h2 className="mb-4">Registro</h2>

          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control rounded-pill"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-pill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@usuario.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control rounded-pill"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill py-2">
              Registrar
            </button>
          </form>
        </div>
      </div>

      {/* Imagen o sección lateral */}
      <div className="w-50">
        <img
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
          alt="Fondo"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>
    </div>
  );
}

export default Register;
