import { Router } from "express"
import gamesRouter from "./game.routes.js"
import customerRouter from './customer.routes.js'

const router = Router()
router.use("/games",gamesRouter)
router.use("/customers",customerRouter)

export default router