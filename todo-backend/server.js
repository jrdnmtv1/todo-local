import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import taskRoutes from './routes/tasks.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error de conexión: ', err))

// Rutas de tareas
app.use('/api/tasks', taskRoutes)

// Arrancar el servidor
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);    
})