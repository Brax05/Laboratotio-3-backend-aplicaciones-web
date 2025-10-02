import React, { useState } from 'react';
import { loginUser } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      setToken(token);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Lado izquierdo: formulario */}
      <div className="d-flex flex-column justify-content-center bg-dark text-white w-50 p-5">
        <div className="mx-auto w-75">
          <h2 className="mb-4">Iniciar Sesión</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-warning w-100 rounded-pill py-2">
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Lado derecho: imagen */}
      <div className="w-50">
        <img
          src="https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg"
          alt="Fondo"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>
    </div>
  );
}

export default Login;
