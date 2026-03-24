const express = require('express');
const router = express.Router();
const taskController = require('../controllers/ToDoControllers');

// READ
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);

// CREATE
router.post('/tasks', taskController.createTask);

// UPDATE
router.put('/tasks/:id', taskController.updateTask);
router.patch('/tasks/:id/estado', taskController.updateEstadoTask);
router.patch('/tasks/:id/prioridad', taskController.updatePrioridadTask);

// DELETE
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;