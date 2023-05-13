import { Router } from "express"
import gamesRouter from "./game.routes.js"

const router = Router()
router.use(gamesRouter)

export default router