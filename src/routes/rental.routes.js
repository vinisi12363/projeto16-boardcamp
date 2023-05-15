import { Router } from "express"
import {getRentals, insertRentals,finalizeRentals, deleteRentalsById} from '../controllers/rentals.controller.js'
import  validateRental  from "../middlewares/validateGame.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", insertRentals)
rentalsRouter.post("/rentals/:id/return", finalizeRentals)
rentalsRouter.delete("/rentals/:id", deleteRentalsById)


export default rentalsRouter