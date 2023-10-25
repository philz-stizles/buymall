import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    expiry: Joi.string().required(),
    discount: Joi.number().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    expiry: Joi.string().required(),
    discount: Joi.number().required(),
  }),
};

export default {
  create,
  update,
};
