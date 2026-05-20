import { Router } from 'express';
import { getUser, registerUser } from '../services/users.service.js';

const router = Router();

// POST register user
router.post('/register', async (req, res, next) => {
    const user = req.body;

    if (!user) {
        next({
            status: 400,
            message: 'No user provided in request body',
        });
    }

    const result = await registerUser({
        userId: crypto.randomUUID().substring(0, 5),
        ...user,
    });

    if (result.success) {
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: result.user,
        });
    } else {
        next({
            status: 401,
            message: result.message,
        });
    }
});

// POST login user
router.post('/login', async (req, res, next) => {
    const user = req.body;

    if (!user) {
        next({
            status: 400,
            message: 'No user provided in request body',
        });
    }

    const result = await getUser(user.username);

    if (result.success) {
        if (result.user.password === user.password) {
            global.user = result.user;

            res.status(201).json({
                success: true,
                message: 'User logged in successfully',
                user: result.user,
            });
        } else {
            next({
                status: 401,
                message: 'Invalid password',
            });
        }
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

export default router;
