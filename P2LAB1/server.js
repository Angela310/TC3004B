const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', taskRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('API de Tasks funcionando correctamente con PostgreSQL');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});