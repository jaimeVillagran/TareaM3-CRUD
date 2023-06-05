import Joi, { ObjectSchema } from 'joi';
//esquema de validacion registro. Como deben venir los campos.

const signupSchema: ObjectSchema = Joi.object().keys({
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

    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be valid',
        'string.empty': 'Email is required',
    }),
    avatarColor: Joi.string().required().messages({
        'any.required': 'Avatar is required'
    })
});

export { signupSchema};
