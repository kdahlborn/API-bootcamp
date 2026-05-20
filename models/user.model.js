import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
