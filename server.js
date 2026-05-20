import express from 'express';
import dotenv from 'dotenv';
import todosRouter from './routes/todos.route.js';
import authRouter from './routes/auth.route.js';
import keysRouter from './routes/keys.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import mongoose from 'mongoose';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);
app.use('/api/auth', authRouter);
app.use('/api/keys', keysRouter);

// Server
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use(errorHandler);
