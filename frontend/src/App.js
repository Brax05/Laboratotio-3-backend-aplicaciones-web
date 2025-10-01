import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> |{' '}
        {!token ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
          </>
        ) : (
          <button onClick={() => setToken(null)}>Logout</button>
        )}
      </nav>
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
  );
}

export default App;
