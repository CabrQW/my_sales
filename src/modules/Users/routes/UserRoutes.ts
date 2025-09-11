import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers"
import { CreateuserSchema } from "../schemas/UserSchemas";

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.get('/', usersController.index)
usersRouter.post('/', CreateuserSchema, usersController.create)

export default usersRouter