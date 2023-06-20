import Joi from 'joi';

const taskValidator = Joi.object().keys({
  title: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Title Task must be a string',
    'string.min': 'Invalid Title Task',
    'string.max': 'Invalid Title Task',
    'string.empty': 'Title Task must not be empty'
  }),
  description: Joi.string().required().min(7).max(50).messages({
    'string.base': 'Description Task must be a string',
    'string.min': 'Invalid Description task',
    'string.max': 'Invalid Description task',
    'string.empty': 'Description Task must not be empty'
  }),
  completed: Joi.boolean().default(false),
});

export default taskValidator;
