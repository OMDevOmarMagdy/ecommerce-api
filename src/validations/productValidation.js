const Joi = require('joi');

const createProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    numReviews: Joi.number().min(0).required(),
  });
  return schema.validate(data);
};

module.exports = { createProductValidation };
