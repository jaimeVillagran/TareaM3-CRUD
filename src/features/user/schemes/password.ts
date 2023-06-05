import Joi, { ObjectSchema } from 'joi';
//revisar si matchean las password


const emailSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
        'string.base': 'Field must be valid',
        'string.required': 'Mail is required'
    })
});

const passwordSchema: ObjectSchema = Joi.object().keys({
    password: Joi.string().required().min(4).max(8).messages({
        'string.base': 'password must be a string',
        'string.min': 'Invalid passwpord',
        'string.max': 'Invalid password',
        'string.empty': 'Password must not be empty'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Password should match',
        'any.required': 'Password is required'
    })
});
export { emailSchema, passwordSchema };
