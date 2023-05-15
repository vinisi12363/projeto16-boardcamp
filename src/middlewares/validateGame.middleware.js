
export default function validateGame(schema) {
    console.log ('dentro do validateGame')
    return (req, res, next) => {
        const { stockTotal, pricePerDay, name, image } = req.body
        if (!stockTotal || !pricePerDay || !name || !image) return res.status(400)
      
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        next()
   
    }
}