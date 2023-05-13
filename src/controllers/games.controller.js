import { db } from "../config/connectdbConfig.js"
import queryBuilder from '../Utils/services/queryBuilder.service.js'

export async function getGames(req, res) {
    try {
        const games = await db.query (queryBuilder('games'))
        console.table(games.rows)
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export default getGames