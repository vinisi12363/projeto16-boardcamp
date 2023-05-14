
export default function validateCustomer(schema) {
 
    return (req, res, next) => {

        /*
        const { birthday, cpf, name, phone } = req.body
           
        if(!birthday || !cpf || !name || !phone) return res.status(400)
        else if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)
        
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message) 
            if (errors.details.some(error => error.message === '"name" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"cpf" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"phone" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
           else if (errors.details.some(error => error.message === '"birthday" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            return res.status(422).send(errors)
        } */
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        next()
    }
}