import Joi from "joi";

export const validateCustomer = (customer) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),

    phoneNo: Joi.string().min(7).max(15).required(),

    location: Joi.object({
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),

    profileImage: Joi.string().allow(""),
  });

  return schema.validate(customer);
};
