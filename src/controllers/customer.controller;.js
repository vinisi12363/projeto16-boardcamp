import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'

export async function getCustomers(req, res) {
    try {
        const games = await db.query(queryBuilder('customers'))
        console.table(games.rows)
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function insertCustomers(req, res) {
    const { birthday, cpf, name, phone } = req.body
    

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
    `, [name, phone, cpf, birthday])
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Customer criado com sucesso")
}

export default {getCustomers, insertCustomers}