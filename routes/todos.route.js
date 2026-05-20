import { Router } from 'express';
import {
    authenticateKey,
    authorizeTodo,
    authorizeUser,
} from '../middlewares/auth.middleware.js';
import {
    createTodo,
    getTodos,
    removeTodo,
    updateTodo,
} from '../services/todos.service.js';

const router = Router();

router.use(authenticateKey);

// GET todos
router.get('/', async (req, res, next) => {
    const result = await getTodos();

    if (result.success) {
        res.json({
            success: true,
            todos: result.todos,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

// POST new todo
router.post('/', authorizeUser, async (req, res, next) => {
    const task = req.body;

    if (!task) {
        next({
            status: 400,
            message: 'No task provided in request body',
        });
    }

    const result = await createTodo({
        todoId: crypto.randomUUID().substring(0, 5),
        ...task,
        done: false,
        userId: global.user.userId,
    });

    if (result.success) {
        res.status(201).json({
            success: true,
            todo: result.todo,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

// PATCH todo
router.patch(
    '/:todoId',
    authorizeUser,
    authorizeTodo,
    async (req, res, next) => {
        const { todoId } = req.params;
        const result = await updateTodo(todoId);

        if (result.success) {
            res.json({
                success: true,
                message: 'Todo updated successfully',
                todo: result.todo,
            });
        } else {
            next({
                status: 400,
                message: result.message,
            });
        }
    },
);

// DELETE todo
router.delete(
    '/:todoId',
    authorizeUser,
    authorizeTodo,
    async (req, res, next) => {
        const { todoId } = req.params;
        const result = await removeTodo(todoId);

        if (result.success) {
            res.json({
                success: true,
                message: 'Todo removed successfully',
                todo: result.todo,
            });
        } else {
            next({
                status: 404,
                message: result.message,
            });
        }
    },
);
export default router;
