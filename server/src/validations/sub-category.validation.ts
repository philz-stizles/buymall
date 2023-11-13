import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().allow('', null),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow('', null),
  }),
};

export default {
  create,
  update,
};
