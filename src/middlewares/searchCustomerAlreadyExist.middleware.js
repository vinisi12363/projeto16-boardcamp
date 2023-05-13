import {db} from '../config/connectdbConfig.js'

export default async function searchCustomer(req, res , next) {
    const { birthday, cpf, name, phone } = req.body
    if(!birthday || !cpf || !name || !phone) return res.status(400)
    try{
         const customerData = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
         
         if (customerData) return res.status(409).send("Customer is already registered")
    }
    catch(err){
        res.status(500).send(err.message)
    }

    next()
}