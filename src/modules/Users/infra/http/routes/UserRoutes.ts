import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers"
import { CreateuserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddlewares";

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.get('/', AuthMiddleware.execute, usersController.index)
usersRouter.post('/', CreateuserSchema, usersController.create)

export default usersRouter