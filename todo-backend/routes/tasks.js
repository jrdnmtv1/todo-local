import express from 'express'
import Task from '../models/Task.js'

const router = express.Router()

// Obtener todas las tareas
router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})

// Crear tarea
router.post('/', async (req, res) => {
    const newTask = new Task(req.body)
    const saved = await newTask.save()
    res.json(saved)
})

// Actualizar tarea
router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.json(updated)
})

// Eliminar tarea
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Tarea eliminada'})
})

export default router
