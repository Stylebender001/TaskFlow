import Joi from "joi";

export function validateWorker(worker) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    skills: Joi.array()
      .items(
        Joi.object({
          skill: Joi.string().required(),
          level: Joi.number().min(1).max(5).required(),
        })
      )
      .required(),
    description: Joi.string().required(),
    location: Joi.object({
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
  });

  return schema.validate(worker);
}
