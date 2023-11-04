import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number(),
    quantity: Joi.number().required(),
    category: Joi.string(),
    subCategory: Joi.string().allow('', null),
    hasShipping: Joi.boolean().default(false),
    inStock: Joi.boolean().default(false),
    isPublished: Joi.boolean().default(false),
    images: Joi.array(),
  }),
};

const update = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number(),
    quantity: Joi.number().required(),
    hasShipping: Joi.boolean().default(false),
    inStock: Joi.boolean().default(false),
  }),
};

export default {
  create,
  update,
};
