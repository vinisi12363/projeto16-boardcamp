import { Router } from "express"
import gamesRouter from "./game.routes.js"
import customerRouter from './customer.routes.js'

const router = Router()
router.use(gamesRouter)
router.use(customerRouter)

export default router