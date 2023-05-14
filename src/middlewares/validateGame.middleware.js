
export default function validateRental(schema) {
 
    return (req, res, next) => {
        const { customerId, gameId, rentDate, daysRented,  returnDate , originalPrice, delayFee} = req.body
           
        if(!customerId || !gameId || !rentDate || !daysRented ||!returnDate || !originalPrice || !delayFee ) return res.status(400)
        
        else if (customerId <0 || gameId< 0 || rentDate==='' || daysRented === '' || returnDate=== ''  ||originalPrice < 0  ) return res.status(400)
        
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message) 
            if (errors.details.some(error => error.message === '"customerId" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"gameId" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"rentDate" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
           else if (errors.details.some(error => error.message === '"daysRented" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"returnDate" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"originalPrice" is not allowed to be empty.')) {
                return res.status(400).send('O nome não pode estar vazio.');
            }
            else if (errors.details.some(error => error.message === '"delayFee" is not allowed to be empty.')) {
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