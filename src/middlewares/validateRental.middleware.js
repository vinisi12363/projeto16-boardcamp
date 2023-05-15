
export default function validateRental(schema) {
 
    return (req, res, next) => {
       
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        next()
   
    }
}