import { keyExists } from '../services/keys.service.js';
import { getTodoById } from '../services/todos.service.js';

// Finns api-nyckel och är den giltig?
export const authenticateKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        next({
            status: 401,
            message: 'No API key provided',
        });
    }

    const result = await keyExists(apiKey);

    if (!result.success) {
        next({
            status: 401,
            message: result.message,
        });
    }

    next();
};

// Är användare inloggad?
export const authorizeUser = (req, res, next) => {
    const user = global.user;

    if (!user) {
        next({
            status: 401,
            message: 'User not logged in',
        });
    }

    next();
};

// Har inloggad användare skapat todo:n?
export const authorizeTodo = async (req, res, next) => {
    const { todoId } = req.params;
    const user = global.user;
    const result = await getTodoById(todoId);

    if (result.todo.userId !== user.userId) {
        next({
            status: 403,
            message: 'User is not authorized',
        });
    }

    next();
};
