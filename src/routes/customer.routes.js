import { Router } from "express"
import {getCustomers, insertCustomers, updateCustomers} from '../controllers/customer.controller.js'
import validateCustomer  from "../middlewares/validateCustomers.middleware.js"
import {customersSchema} from '../schemas/customer.schema.js'
//import searchCustomer from "../middlewares/searchCustomerAlreadyExist.middleware.js"

const customerRouter = Router()

customerRouter.get("/customers/:id", getCustomers)
customerRouter.post("/customers", validateCustomer(customersSchema),  insertCustomers)
customerRouter.put("/customers/:id", updateCustomers)


export default customerRouter