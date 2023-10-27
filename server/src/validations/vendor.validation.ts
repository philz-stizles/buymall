import Joi from 'joi';

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    bio: Joi.string(),
  }),
};

export default {
  update,
};
