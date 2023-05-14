
export function validateSchema(schema) {
  console.log ('olá de entro do middle')
    return (req, res, next) => {
        const {name , phone , birthday , cpf} = req.body
        
        if(!birthday || !cpf || !name || !phone) return res.status(400)
        if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)

        const validation = schema.validate(req.body, { abortEarly: false })
        console.log("validation", validation)
    
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message) 
            return res.status(422).send(errors)
        }

        next()
    }
}