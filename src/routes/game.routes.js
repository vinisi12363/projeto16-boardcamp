import { Router } from "express"
import {getGames,insertGames} from '../controllers/games.controller.js'
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { gameSchema } from "../schemas/game.schema.js"
import searchGame from '../middlewares/searchGameAlreadyExists.middleware.js'

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchema(gameSchema),   insertGames)


export default gamesRouter