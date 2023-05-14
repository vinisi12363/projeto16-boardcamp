import {db} from '../config/connectdbConfig.js'

export default async function searchGame(req, res , next) {
    console.log ("dentro do serch game")
    const { name } = req.body
        try{
            const gameData = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
            console.log ('GAME DATA', gameData)
            if (gameData.rows.length > 0) return res.status(409).send ("game is already registered")
        }catch(err){
            res.status(500).send(err.message)
        }
  

    next()
}