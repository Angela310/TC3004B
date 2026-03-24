const pool = require('../db');

// Obtener todos los tasks
exports.getAllTasks = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks ORDER BY nombre'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Obtener una task por ID
exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id_task = $1',
            [taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Crear una nueva task
exports.createTask = async (req, res) => {
    const { nombre, fecha, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la tarea es obligatorio' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO tasks (nombre, fecha, descripcion)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre, fecha || null, descripcion || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

// Actualizar nombre, fecha y descripción
exports.updateTask = async (req, res) => {
    const { nombre, fecha, descripcion } = req.body;
    const taskId = req.params.id;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la tarea es obligatorio' });
    }

    try {
        const checkResult = await pool.query(
            'SELECT * FROM tasks WHERE id_task = $1',
            [taskId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const updateResult = await pool.query(
            `UPDATE tasks
             SET nombre = $1, fecha = $2, descripcion = $3
             WHERE id_task = $4
             RETURNING *`,
            [nombre, fecha || null, descripcion || null, taskId]
        );

        res.json(updateResult.rows[0]);
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Actualizar estado
exports.updateEstadoTask = async (req, res) => {
    const taskId = req.params.id;
    const { estado } = req.body;

    if (estado === undefined) {
        return res.status(400).json({ error: 'El estado es obligatorio (true o false)' });
    }

    try {
        const result = await pool.query(
            `UPDATE tasks
             SET estado = $1
             WHERE id_task = $2
             RETURNING *`,
            [estado, taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
};

// Actualizar prioridad
exports.updatePrioridadTask = async (req, res) => {
    const taskId = req.params.id;
    const { prioridad } = req.body;

    if (!prioridad) {
        return res.status(400).json({ error: 'La prioridad es obligatoria' });
    }

    const prioridadesValidas = ['Alta', 'Media', 'Baja'];

    if (!prioridadesValidas.includes(prioridad)) {
        return res.status(400).json({
            error: 'Prioridad inválida. Usa: Alta, Media o Baja'
        });
    }

    try {
        const result = await pool.query(
            `UPDATE tasks
             SET prioridad = $1
             WHERE id_task = $2
             RETURNING *`,
            [prioridad, taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar la prioridad:', error);
        res.status(500).json({ error: 'Error al actualizar la prioridad' });
    }
};

// Eliminar task
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id_task = $1 RETURNING *',
            [taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};