import Todo from '../models/todo.model.js';

// Get todos
export const getTodos = async () => {
    try {
        const result = await Todo.find();
        return {
            success: true,
            todos: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// Get todo by todo id
export const getTodoById = async (todoId) => {
    try {
        const result = await Todo.findOne({ todoId });
        return {
            success: true,
            todo: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// Create todo
export const createTodo = async (todo) => {
    try {
        const result = await Todo.create(todo);
        return {
            success: true,
            todo: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// Update todo
export const updateTodo = async (todoId) => {
    try {
        const todo = await Todo.findOne({ todoId });

        if (!todo) throw new Error('Todo not found');

        todo.done = !todo.done;

        const updatedTodo = await todo.save();

        return {
            success: true,
            todo: updatedTodo,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// Remove todo
export const removeTodo = async (todoId) => {
    try {
        const result = await Todo.findOneAndDelete({ todoId });
        return {
            success: true,
            todo: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
