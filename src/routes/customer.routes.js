import { Router } from "express"
import {getCustomers, insertCustomers, updateCustomers} from '../controllers/customer.controller.js'
import { validateCustomerSchema } from "../middlewares/validateUserSchema.middleware.js"
import {customersSchema} from '../schemas/customer.schema.js'

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.post("/customers", validateCustomerSchema(customersSchema),  insertCustomers)
customerRouter.put("/customers/:id", updateCustomers)


export default customerRouter