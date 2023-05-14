import { db } from "../config/connectdbConfig.js"
import queryBuilder from './Utils/queryBuilder.service.js'

export async function getGames(req, res) {
    try {
        const games = await db.query(queryBuilder('games'))
        
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function insertGames(req, res) {
    try {
    const { stockTotal, pricePerDay, name, image } = req.body
    if (!stockTotal || !pricePerDay || !name || !image) return res.status(400)
    if (stockTotal <= 0 || pricePerDay<= 0 || image ==='' || name === '') return res.status(400)

        const gameData = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
        console.log ('GAME DATA', gameData)
        if (gameData.rows.length > 0) return res.status(409).send ("game is already registered")
        else if (gameData.rows.length === 0){
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
          }
    } catch (err) {
        res.status(500).send(err.message)
    }
    res.status(201).send("Game criado com sucesso")
}

export default {getGames, insertGames}