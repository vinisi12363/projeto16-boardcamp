import joi from "joi"

export const gameSchema = joi.object({
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().required(),
    name: joi.string().required(),
    image: joi.string().required()
})
