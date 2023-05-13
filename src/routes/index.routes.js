import { Router } from "express"
import gamesRouter from "./game.routes.js"
import customerRouter from './customer.routes.js'
import rentalsRouter from "./rental.routes.js"


const router = Router()
router.use(gamesRouter)
router.use(customerRouter)
router.use(rentalsRouter)


export default router