import { Router } from 'express';
import { users } from '../data/users.data.js';
import { keys } from '../data/keys.data.js';
import validate from '../middlewares/validate.middleware.js';
import userSchema from '../validation/user.validation.js';

const router = Router();

// POST register
router.post('/register', validate(userSchema), (req, res, next) => {
    const { username, password } = req.body;

    if (username && password) {
        if (
            users.some(
                (u) => u.username.toLowerCase() === username.toLowerCase(),
            )
        ) {
            next({
                status: 403,
                message: 'Username already exists',
            });
        } else {
            const newUser = {
                username,
                password,
            };

            users.push(newUser);

            res.status(201).json({
                success: true,
                message: 'New user registered successfully',
                user: newUser,
            });
        }
    } else {
        next({
            status: 400,
            message: 'Both username and password are required',
        });
    }
});

// POST login
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (username && password) {
        const user = users.find(
            (u) => u.username.toLowerCase() === username.toLowerCase(),
        );

        if (user && user.password === password) {
            const key = keys[Math.floor(Math.random() * keys.length)];

            res.status(201).json({
                success: true,
                message: 'User logged in successfully',
                user: {
                    ...user,
                    key,
                },
            });
        } else {
            next({
                status: 403,
                message: 'Incorrect username or password',
            });
        }
    } else {
        next({
            status: 400,
            message: 'Both username and password are required',
        });
    }
});

export default router;
