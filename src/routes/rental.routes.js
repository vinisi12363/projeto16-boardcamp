import { Router } from "express"
import {getRentals, insertRentals, calculateRentals, deleteRentalsById} from '../controllers/rentals.controller.js'
import  validateRental  from "../middlewares/validateRental.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateRental(rentalSchema),  insertRentals)
rentalsRouter.put("/rentals", validateRental(rentalSchema),  calculateRentals)
rentalsRouter.delete("/rentals/:id", validateRental(rentalSchema), deleteRentalsById)


export default rentalsRouter