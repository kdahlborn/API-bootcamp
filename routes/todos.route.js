import { Router } from 'express';
import { todos } from '../data/todos.js';

const router = Router();

// GET todos
router.get('/', (req, res) => {
    res.json({
        success: true,
        todos,
    });
});

// GET todos by ID
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === id);

    if (todo) {
        res.json({
            success: true,
            todo,
        });
    } else {
        next({
            status: 400,
            message: 'No todo with the corresponding id found',
        });
    }
});

// POST new todo
router.post('/', (req, res, next) => {
    const todo = req.body;

    if (!todo || Object.keys(todo).length === 0) {
        return next({
            status: 400,
            message: 'No todo provided in request body',
        });
    }

    const newTodo = {
        id: crypto.randomUUID().substring(0, 5),
        ...todo,
        completed: false,
    };

    todos.push(newTodo);

    res.status(201).json({
        success: true,
        message: 'Todo added successfully',
        todo: newTodo,
    });
});

// PATCH todo status
router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === id);

    if (todo) {
        todos.map((t) => {
            if (t.id === id) t.completed = !t.completed;
        });

        res.json({
            success: true,
            message: 'Todo updated successfully',
            todo,
        });
    } else {
        next({
            status: 400,
            message: 'No todo with the corresponding id found',
        });
    }
});

// DELETE todo
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const deleted = todos.find((t) => t.id === id);
    const filtered = todos.filter((t) => t.id !== id);

    if (deleted) {
        todos.length = 0;
        todos.push(...filtered);

        res.json({
            success: true,
            message: 'Todo deleted successfully',
            todo: deleted,
        });
    } else {
        next({
            status: 400,
            message: 'No todo with the corresponding id found',
        });
    }
});

export default router;
