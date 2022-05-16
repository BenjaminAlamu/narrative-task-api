const Joi = require("@hapi/joi");

const createBuyOrder = {
  body: Joi.object().keys({
    maxPrice: Joi.string().required().messages({
      "string.empty": `Max Price cannot be an empty field`,
      "any.required": `Max Price is a required field`,
    }),
    dataId: Joi.string().required().messages({
      "string.empty": `Data cannot be an empty field`,
      "any.required": `Data is a required field`,
    }),
  }),
};

module.exports = {
  createBuyOrder,
};