import { keys } from '../data/keys.data.js';

export const authenticateKey = (req, res, next) => {
    const { key } = req.query;

    if (!keys.some((k) => k === key)) {
        next({
            status: 400,
            message: 'Invalid API key',
        });
    }

    next();
};
