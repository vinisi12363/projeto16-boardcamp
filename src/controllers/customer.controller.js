import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'
import dayjs from "dayjs"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(queryBuilder('customers'))
        
        res.status(200).send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }


}
export async function insertCustomers(req, res) {
    const { birthday, cpf, name, phone } = req.body
    if(!birthday || !cpf || !name || !phone) return res.status(400)
    if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)
   



    const date = new Date(birthday).toISOString().split('T')[0]
    console.log("DATA : ",date)
    try {     
            await db.query(`
            INSERT INTO customers (
                name,
                phone,
                cpf,
                birthday  
            ) VALUES (
                
                $1,
                $2,
                $3,
                $4
    
            )
        `, [name, phone, cpf, date])
        
   
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Customer criado com sucesso")
}


export async function updateCustomers(req, res) {
    const { id } = req.params
    const { birthday, cpf, name, phone } = req.body
    if(!birthday || !cpf || !name || !phone) return res.status(400)
    if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)

    try {

        const customerData = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)
         
        
         if (customerData.rows.length>0){
                
            await db.query(`
            UPDATE customers SET
                name = '${name}',  
                phone = '${phone}', 
                cpf = '${cpf}',
                birthday = '${birthday}' 
              WHERE id = ${id};
            `)

         }
       
         
        
   
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Customer alterado  com sucesso")
}

export default {getCustomers, insertCustomers}