import { Router } from "express"
import {getGames} from '../controllers/games.controller.js'
//import { validateSchema } from "../middlewares/validateSchema.middleware.js"
//import { receitaSchema } from "../schemas/receitas.schema.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
//receitasRouter.get("/receitas/:id", getReceitaById)
//receitasRouter.post("/receitas", validateSchema(receitaSchema), createReceita)
//receitasRouter.delete("/receitas/:id", deleteReceita)
//receitasRouter.put("/receitas/:id", validateSchema(receitaSchema), editReceitaById)

export default gamesRouter