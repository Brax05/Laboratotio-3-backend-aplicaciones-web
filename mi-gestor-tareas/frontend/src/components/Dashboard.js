import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
  const handleCreate = async () => {
    if (!title) {
      setError('El título es obligatorio');
      return;
    }
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

  return (
    <div>
      <h2>Dashboard de Tareas</h2>

      {/* Formulario para crear nuevas tareas */}
      <div>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Agregar Tarea</button>
      </div>

      {/* Mostrar error si existe */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Listado de tareas */}
      {tasks.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status}
              <p>{task.description}</p>
              <button
                onClick={() =>
                  handleUpdate(task.id, {
                    status: 'En progreso',
                    title: task.title,
                    description: task.description,
                  })
                }
              >
                En progreso
              </button>
              <button
                onClick={() =>
                  handleUpdate(task.id, {
                    status: 'Completadas',
                    title: task.title,
                    description: task.description,
                  })
                }
              >
                Completar
              </button>
              <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
