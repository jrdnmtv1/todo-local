export default function TaskForm({ tasks, setTasks }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.task;
    const newTask = input.value.trim();

    if (newTask === "") return;

    setTasks([...tasks, { id: Date.now(), text: newTask , completed: false}]);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        name="task"
        placeholder="Nueva tarea"
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out">
        Agregar
      </button>
    </form>
  );
}
