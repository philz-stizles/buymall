import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow('', null),
    isPublished: Joi.boolean().required().default(false),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow('', null),
    isPublished: Joi.boolean().required(),
  }),
};

export default {
  create,
  update,
};
