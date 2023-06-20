import Joi from 'joi';

const taskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean().default(false),
});

export default taskValidator;
