import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const msg = await registerUser(name, email, password);
      setMessage(msg);
      setError('');
      // Limpiar formulario después del registro exitoso
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="mb-3">
                  <i className="bi bi-person-plus-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h2 className="fw-bold text-dark">Crear Cuenta</h2>
                <p className="text-muted">Únete y comienza a organizar tus tareas</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Success Alert */}
              {message && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <div>{message}</div>
                </div>
              )}

              {/* Register Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-person me-2"></i>Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <i className="bi bi-envelope me-2"></i>Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    <i className="bi bi-lock me-2"></i>Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <div className="form-text">Mínimo 6 caracteres</div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registrando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>Registrarse
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-success fw-semibold text-decoration-none">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-3">
            <Link to="/" className="text-white text-decoration-none">
              <i className="bi bi-arrow-left me-2"></i>Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
