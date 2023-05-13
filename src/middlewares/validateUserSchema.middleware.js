
export function validateCustomerSchema(schema) {

    return (req, res, next) => {
        const { birthday, cpf, name, phone } = req.body
        if(!birthday || !cpf || !name || !phone) return res.status(400)
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            return res.status(422).send(errors)
        }

        next()
    }
}