import { Router } from "express";
import CustomersControllers from "../controllers/CustomerControllers";
import AuthMiddleware from "@shared/middlewares/authMiddlewares";
import { createCustomerSchema, idParamsValidate, updateCustomerSchema } from "../schemas/CustomerSchema";

const customerRoutes = Router()
const customersController = new CustomersControllers()

customerRoutes.use(AuthMiddleware.execute)
customerRoutes.get('/', customersController.index)
customerRoutes.get('/:id', idParamsValidate, customersController.show)
customerRoutes.post('/', createCustomerSchema, customersController.create)
customerRoutes.patch('/:id', idParamsValidate, updateCustomerSchema, customersController.update)
customerRoutes.delete('/:id', idParamsValidate, customersController.delete)

export default customerRoutes