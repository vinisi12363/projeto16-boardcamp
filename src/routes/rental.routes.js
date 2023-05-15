import { Router } from "express"
import {getRentals, insertRentals,finalizeRentals, calculateRentals, deleteRentalsById} from '../controllers/rentals.controller.js'
import  validateRental  from "../middlewares/validateGame.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", insertRentals)
rentalsRouter.post("/rentals/:id/return", finalizeRentals)
rentalsRouter.put("/rentals", validateRental(rentalSchema),  calculateRentals)
rentalsRouter.delete("/rentals/:id", validateRental(rentalSchema), deleteRentalsById)


export default rentalsRouter