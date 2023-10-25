import ApiError from '@src/errors/api-error';
import { pick } from '@src/utils/object.utils';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validate =
  (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const obj = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(obj);
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(400, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
