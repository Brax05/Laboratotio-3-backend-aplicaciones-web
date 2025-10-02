import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Hero Section */}
          <div className="text-center text-white mb-5">
            <h1 className="display-3 fw-bold mb-4">
              <i className="bi bi-clipboard-check text-warning"></i>
              <br />
              Bienvenido a Mi Gestor de Tareas
            </h1>
            <p className="lead mb-4">
              Organiza tu vida, aumenta tu productividad y alcanza tus metas con nuestra plataforma intuitiva de gestión de tareas.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/register" className="btn btn-warning btn-lg px-5 shadow">
                <i className="bi bi-person-plus me-2"></i>Comenzar Ahora
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg px-5 shadow">
                <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 text-white h-100 shadow">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-lightning-charge fs-1 text-warning"></i>
                  </div>
                  <h5 className="card-title fw-bold">Rápido y Eficiente</h5>
                  <p className="card-text">
                    Crea, edita y organiza tus tareas en segundos con nuestra interfaz intuitiva.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 text-white h-100 shadow">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-check fs-1 text-warning"></i>
                  </div>
                  <h5 className="card-title fw-bold">Seguro y Confiable</h5>
                  <p className="card-text">
                    Tus datos están protegidos con autenticación segura y encriptación de extremo a extremo.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-white bg-opacity-10 border-0 text-white h-100 shadow">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-graph-up fs-1 text-warning"></i>
                  </div>
                  <h5 className="card-title fw-bold">Aumenta tu Productividad</h5>
                  <p className="card-text">
                    Mantén el control de tus proyectos y alcanza tus objetivos de manera efectiva.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Home;
