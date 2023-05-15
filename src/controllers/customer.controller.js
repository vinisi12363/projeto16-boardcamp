import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'


export async function getCustomers(req, res) {

    try { 
       
        const customers = await db.query(queryBuilder('customers'))
        res.status(200).send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }


}

export async function getCustomersById(req, res) {

    try { 
        const {id}=req.params
        const customers = await db.query(queryBuilder('customers', id))
     
        res.status(200).send(customers.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }


}
export async function insertCustomers(req, res) {
    try {  
    const { birthday, cpf, name, phone } = req.body
    const date = new Date(birthday).toISOString().split('T')[0]

    if(!birthday || !cpf || !name || !phone) return res.status(400)
    else if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)
   
    const customerExist = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[cpf])
    console.log( customerExist)  
    
    if (customerExist.rows.length === 0) {
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
     }
     else if (customerExist.rows.length > 0 ){
        return res.status(409).send("Customer is already registered")
     }

          
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Customer criado com sucesso")
}


export async function updateCustomers(req, res) {
    try {
    const { id } = req.params
    const { birthday, cpf, name, phone } = req.body
    if(!birthday || !cpf || !name || !phone) return res.status(400)
    if (birthday === '' || cpf=== '' || phone==='' || name === '') return res.status(400)

        if (name.length === 0 || name === '' || !id) return res.status(400)
        const customerData = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)
        
        const cpfChecker = await db.query(`SELECT * from customers where cpf = '${cpf}'`)
        
        if (cpfChecker && cpfChecker.rows[0].id !== id) return res.status(409).send("cpf already in use")
       
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
    res.status(200).send("Customer alterado  com sucesso")
}

export default {getCustomers,getCustomersById , insertCustomers, updateCustomers}