import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),

    password: Joi.string()
        .min(5)
        .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
        .required(),
});

export default userSchema;
