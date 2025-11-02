import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Todas');

  // Cargar tareas
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error cargando tareas');
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  // Crear tarea
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('El título es obligatorio');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Error creando tarea');
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tarea
  const handleUpdate = async (taskId, updatedFields) => {
    if (!taskId) {
      setError('ID de tarea inválido');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error('Error actualizando tarea');
      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t.id === taskId ? updatedTask : t)));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar tarea
  const handleDelete = async (taskId) => {
    if (!taskId) {
      setError('ID de tarea inválido');
      return;
    }
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error eliminando tarea');
      await response.json();
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtrar tareas
  const filteredTasks = filter === 'Todas' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  // Estadísticas
  const stats = {
    total: tasks.length,
    sinIniciar: tasks.filter(t => t.status === 'Sin iniciar').length,
    enProgreso: tasks.filter(t => t.status === 'En progreso').length,
    completadas: tasks.filter(t => t.status === 'Completadas').length,
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold text-white mb-1">
            <i className="bi bi-kanban me-2"></i>Dashboard de Tareas
          </h2>
          <p className="text-white-50">Gestiona y organiza tus tareas de manera eficiente</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-white bg-opacity-10 border-0 text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 text-white-50 small">Total</p>
                  <h3 className="mb-0 fw-bold">{stats.total}</h3>
                </div>
                <i className="bi bi-list-task fs-1 text-white-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info bg-opacity-75 border-0 text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small">Sin Iniciar</p>
                  <h3 className="mb-0 fw-bold">{stats.sinIniciar}</h3>
                </div>
                <i className="bi bi-clock-history fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning bg-opacity-75 border-0 text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small">En Progreso</p>
                  <h3 className="mb-0 fw-bold">{stats.enProgreso}</h3>
                </div>
                <i className="bi bi-hourglass-split fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success bg-opacity-75 border-0 text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small">Completadas</p>
                  <h3 className="mb-0 fw-bold">{stats.completadas}</h3>
                </div>
                <i className="bi bi-check-circle fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="row">
        {/* Formulario para crear nuevas tareas */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>Nueva Tarea
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Ej: Completar informe mensual"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">Descripción</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Detalles adicionales..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Agregando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-lg me-2"></i>Agregar Tarea
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Listado de tareas */}
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-list-check me-2"></i>Mis Tareas
                </h5>
                {/* Filtros */}
                <div className="btn-group btn-group-sm" role="group">
                  <button 
                    type="button" 
                    className={`btn ${filter === 'Todas' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('Todas')}
                  >
                    Todas
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filter === 'Sin iniciar' ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => setFilter('Sin iniciar')}
                  >
                    Sin Iniciar
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filter === 'En progreso' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('En progreso')}
                  >
                    En Progreso
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filter === 'Completadas' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setFilter('Completadas')}
                  >
                    Completadas
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                  <p className="mb-0">No hay tareas {filter !== 'Todas' && `con estado "${filter}"`}</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="mb-1 fw-bold">{task.title}</h6>
                          {task.description && (
                            <p className="mb-2 text-muted small">{task.description}</p>
                          )}
                          <div className="d-flex gap-2 align-items-center">
                            <span className={`badge ${
                              task.status === 'Sin iniciar' ? 'bg-info' :
                              task.status === 'En progreso' ? 'bg-warning' :
                              'bg-success'
                            }`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                        <div className="btn-group btn-group-sm ms-3" role="group">
                          {task.status !== 'En progreso' && (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                handleUpdate(task.id, {
                                  status: 'En progreso',
                                  title: task.title,
                                  description: task.description,
                                })
                              }
                              title="Marcar en progreso"
                            >
                              <i className="bi bi-play-circle"></i>
                            </button>
                          )}
                          {task.status !== 'Completadas' && (
                            <button
                              className="btn btn-outline-success"
                              onClick={() =>
                                handleUpdate(task.id, {
                                  status: 'Completadas',
                                  title: task.title,
                                  description: task.description,
                                })
                              }
                              title="Marcar como completada"
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(task.id)}
                            title="Eliminar tarea"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
