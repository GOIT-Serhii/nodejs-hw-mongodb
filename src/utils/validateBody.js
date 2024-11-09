import createHttpError from 'http-errors';

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = validateBody.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw next(createHttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
