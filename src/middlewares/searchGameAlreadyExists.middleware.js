import {db} from '../config/connectdbConfig.js'

export default async function searchGame(req, res , next) {

    const { name } = req.body
        try{
            const gameData = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
            if (gameData && gameData !== null && gameData !== []) return res.status(409).send ("game is already registered")
        }catch(err){
            res.status(500).send(err.message)
        }
  

    next()
}