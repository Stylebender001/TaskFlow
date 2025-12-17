import Joi from "joi";

export function validateWorker(worker) {
  const schema = Joi.object({
    skills: Joi.array()
      .items(
        Joi.object({
          skill: Joi.string().required(),
          level: Joi.number().min(1).max(5).required(),
        })
      )
      .required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(worker);
}
