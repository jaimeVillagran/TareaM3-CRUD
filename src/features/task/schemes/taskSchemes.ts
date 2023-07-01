import Joi, { ObjectSchema } from 'joi';

const taskValidator: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().min(4).max(50).messages({
    'string.base': 'The task title must be a text string',
    'string.empty': 'Task title must not be empty',
    'string.min': 'The task title must be at least 4 characters long.',
    'string.max': 'The task title must not exceed 50 characters.'
  }),
  description: Joi.string().required().min(10).max(200).messages({
    'string.base': 'The task description must be a string of text',
    'string.empty': 'Task description must not be empty',
    'string.min': 'The task description must be at least 10 characters long',
    'string.max': 'The description of the task should not exceed 200 characters'
  }),
  completed: Joi.boolean().required().messages({
    'boolean.base': 'The field must be a boolean value',
    'any.required': 'The field is required'
  })
});

export { taskValidator };
