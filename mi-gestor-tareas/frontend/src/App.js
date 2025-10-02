import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-check2-circle me-2"></i>
            Mi Gestor de Tareas
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door me-1"></i>Inicio
                </Link>
              </li>
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="bi bi-box-arrow-in-right me-1"></i>Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="bi bi-person-plus me-1"></i>Registro
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light btn-sm ms-2" 
                    onClick={() => setToken(null)}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>Cerrar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
