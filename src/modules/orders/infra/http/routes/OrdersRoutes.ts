import { Router } from "express";
import OrdersController from "../controllr/OrdersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddlewares";
import { createOrderValidate, idParamsValidate } from "../../../infra/http/schemas/OrdersSchemas";

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(AuthMiddleware.execute)

ordersRouter.get('/:id', idParamsValidate, ordersController.show)
ordersRouter.post('/', createOrderValidate, ordersController.create)

export default ordersRouter
