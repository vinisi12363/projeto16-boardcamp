import { Router } from "express"
import {getGames,insertGames} from '../controllers/games.controller.js'
import { validateGame } from "../middlewares/validateGame.middleware.js"
import { gameSchema } from "../schemas/game.schema.js"


const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateGame(gameSchema),   insertGames)


export default gamesRouter