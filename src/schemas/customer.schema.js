import Joi from 'joi'

 export const customersSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().regex(/^\d{11}$/).required(),
    cpf: Joi.string().regex(/^\d{11}$/).required(),
    birthday: Joi.date().iso().required(),
  });
