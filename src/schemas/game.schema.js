import joi from "joi"

export const gameSchema = joi.object({
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().required(),
    name: joi.string(),
    image: joi.string().required()
})
