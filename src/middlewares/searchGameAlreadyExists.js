import {db} from '../config/connectdbConfig.js'

export default async function searchGame(req, res , next) {
    const { stockTotal, pricePerDay, name, image } = req.body
    if(!stockTotal || !pricePerDay || !name || !image) return res.status(400)
    try{
         const gameData = await db.query(`SELECT * FROM games WHERE "name" = '${name}'`)
        if (gameData) return res.status(409).send ("game is already registered")
    }
    catch(err){
        res.status(500).send(err.message)
    }

    next()
}