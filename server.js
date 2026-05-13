import express from 'express';
import dotenv from 'dotenv';
import todosRouter from './routes/todos.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(errorHandler);
