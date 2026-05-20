import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        todoId: {
            type: String,
            unique: true,
            required: true,
        },
        task: {
            type: String,
            required: true,
            minLength: 3,
        },
        done: {
            type: Boolean,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
