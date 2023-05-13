
export function validateSchema(schema) {

    return (req, res, next) => {
        const { stockTotal, pricePerDay, name, image } = req.body
        if(!stockTotal || !pricePerDay || !name || !image) return res.status(400)
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            return res.status(422).send(errors)
        }

        next()
    }
}