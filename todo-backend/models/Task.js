import mongoose from'mongoose';

// Define la estructura de cada "tarea" en la base de datos
const TaskSchema = new mongoose.Schema({
    text: { type: String, required: true},
    completed: { type: Boolean, default: false},
})

const Task = mongoose.model('Task', TaskSchema)
export default Task