import { Router } from "express"
import {getCustomers, insertCustomers, updateCustomers} from '../controllers/customer.controller.js'
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import {customersSchema} from '../schemas/customer.schema.js'
//import searchCustomer from "../middlewares/searchCustomerAlreadyExist.middleware.js"

const customerRouter = Router()

customerRouter.get("/customers/:id", getCustomers)
customerRouter.post("/customers", validateSchema(customersSchema),  insertCustomers)
customerRouter.put("/customers/:id", updateCustomers)


export default customerRouter