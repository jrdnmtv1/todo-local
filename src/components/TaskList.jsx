import { useState } from "react";
import { FiEdit, FiSave, FiX, FiTrash2 } from 'react-icons/fi';

export default function TaskList({ tasks, setTasks, filter }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((t) => t.id !== id));
  // };
  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(t => t._id !== id))
  }

  // const toggleComplete = (id) => {
  //   const updated = tasks.map((task) =>
  //     task.id === id ? { ...task, completed: !task.completed } : task
  //   );
  //   setTasks(updated);
  // };
  const toggleComplete = async (task) => {
    const res = await fetch(`http://localhost:4000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify({ completed: !task.completed })
    })

    const updated = await res.json();
    setTasks(tasks.map(t => t._id === task._id ? updated : t))
  }

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  // const saveEdit = (id) => {
  //   if (editText.trim() === "") return;
  //   const updated = tasks.map((task) =>
  //     task.id === id ? { ...task, text: editText } : task
  //   );
  //   setTasks(updated);
  //   cancelEditing();
  // };
  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({text: editText})
    })

    const updated = await res.json();
    setTasks(tasks.map(t => t._id === id ? updated : t));
    cancelEditing()
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all'
  });

  return (
    <ul className="space-y-4">
      {filteredTasks.length !== 0 ? filteredTasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center bg-white px-4 py-2 rounded shadow hover:scale-102 transition-all ease-in-out"
        >
          <div className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
              className="accent-blue-600 w-5 h-5"
            />
            {editingId === task._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 border px-2 py-1 rounded focus:outline-none"
              />
            ) : (
              <span
                className={`flex-1  ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
            )}
          </div>

          {editingId === task._id ? (
            <div className="flex gap-2">
                <button onClick={() => saveEdit(task._id)} className="text-green-500 hover:text-green-800 cursor-pointer text-xl transition-colors" ><FiSave /></button>
                <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-800 cursor-pointer text-xl transition-colors"><FiX /></button>
            </div>
          ) : (
            <div className="flex gap-2">
                <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-800 cursor-pointer text-xl transition-colors"><FiEdit /></button>
                <button onClick={() => {
                  if(window.confirm("¿Estas seguro de que quieres eliminar esta tarea?")) {
                    deleteTask(task._id)
                  }
                }} className="text-red-500 hover:text-red-800 cursor-pointer text-xl transition-colors"><FiTrash2 /></button>
            </div>
          )}         
        </li>
      )) : <li className="text-center text-gray-500 italic">No hay tareas</li>}
    </ul>
  );
}
