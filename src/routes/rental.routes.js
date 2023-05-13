import { Router } from "express"
import {getRentals, insertRentals, updateRentals, deleteRentals} from '../controllers/rentals.controller.js'
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalSchema),  insertRentals)
rentalsRouter.put("/rentals", validateSchema(rentalSchema),  updateRentals)
rentalsRouter.delete("/rentals", validateSchema(rentalSchema), deleteRentals)


export default rentalsRouter