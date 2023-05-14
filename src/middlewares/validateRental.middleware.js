
export default function validateGame(schema) {
 
    return (req, res, next) => {
        const { stockTotal, pricePerDay, name, image } = req.body
           
        if(!stockTotal || !pricePerDay || !name || !image) return res.status(400)
        else if (stockTotal <0 || pricePerDay< 0 || image==='' || name === '') return res.status(400)
        
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message) 
            if (errors.details.some(error => error.message === '"stockTotal" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"pricePerDay" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"name" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
           else if (errors.details.some(error => error.message === '"image" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            return res.status(422).send(errors)
        }
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        next()
   
    }
}