import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
    username: Joi.string().required().min(4).max(8).messages({
        'string.base': 'Username must be a string',
        'string.min': 'Invalid username',
        'string.max': 'Invalid username',
        'string.empty': 'User must not be empty'

    }),
    password:Joi.string().required().min(4).max(8).messages({
        'string.base': 'password must be a string',
        'string.min': 'Invalid passwpord',
        'string.max': 'Invalid password',
        'string.empty': 'Password must not be empty'

    })

});

export { loginSchema};
