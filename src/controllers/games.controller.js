import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'

export async function getGames(req, res) {
    try {
        const games = await db.query(queryBuilder('games'))
        console.table(games.rows)
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function insertGames(req, res) {
    const { stockTotal, pricePerDay, name, image } = req.body
    console.log("BODY", req.body)

    const QUERY = `
        INSERT INTO games (
            "stockTotal",
            "pricePerDay",
            name,
            image  
        ) VALUES (
            
            $1,
            $2,
            $3,
            $4

        )
    `

    console.table(QUERY)
    try {
        await db.query(`
        INSERT INTO games (
            "stockTotal",
            "pricePerDay",
            name,
            image  
        ) VALUES (
            
            $1,
            $2,
            $3,
            $4

        )
    `, [stockTotal, pricePerDay, name, image])
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Game criado com sucesso")
}

export default getGames