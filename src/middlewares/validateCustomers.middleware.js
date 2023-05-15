
export default function validateCustomer(schema) {
 
    return (req, res, next) => {
        const { birthday, cpf, name, phone } = req.body
           
        if(!birthday || !cpf || !name || !phone) return res.status(400).send('error in the structure')
        
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        next()
    }
}