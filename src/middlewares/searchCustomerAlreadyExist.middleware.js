import {db} from '../config/connectdbConfig.js'

export default async function searchCustomer(req, res , next) {
    const { cpf } = req.body
   try{
    const customerData = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[cpf])
        //console.log("costumerData dentro do middleware ", customerData)   
     if (customerData.rows !== []) return res.status(409).send("Customer is already registered")
   } catch (err){res.status(500).send(err.message)}

    next()
}