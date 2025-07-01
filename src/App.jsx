import "./App.css";

import { useEffect, useState } from 'react';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  // const [tasks, setTasks] = useState(() => {
  //   const saved = localStorage.getItem('tasks');
  //   return saved ? JSON.parse(saved) : [];
  // });
  const [tasks, setTasks] = useState([])

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://todo-backend-eeot.onrender.com/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error al cargar tareas: ', err)
      )
  }, [])


  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight">📝 Mis Tareas</h1>
        <TaskForm setTasks={setTasks} tasks={tasks} />
        {/* Filtros */}
        <div className="w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-4 px-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded cursor-pointer transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700'}`}>Todas</button>          
          <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded cursor-pointer transition-colors ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700'}`}>Completadas</button>          
          <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded cursor-pointer transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700' }`}>Pendientes</button>
        </div>
        <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
      </div>
    </main>
  )
}

export default App;