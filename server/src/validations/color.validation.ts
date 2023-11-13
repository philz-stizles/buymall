import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    isPublished: Joi.boolean().required().default(false),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    isPublished: Joi.boolean().required(),
  }),
};

export default {
  create,
  update,
};
