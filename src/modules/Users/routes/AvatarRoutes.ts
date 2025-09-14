import { Router } from 'express'
import UpdateAvatarControllers from '../controllers/UpdateAvatarControllers'
import multer from 'multer'
import uploadConfig from '@config/upload'
import AuthMiddleware from '@shared/middlewares/authMiddlewares'

const avatarRoutes = Router()
const userAvatarController = new UpdateAvatarControllers()
const upload = multer(uploadConfig)

avatarRoutes.patch('/', AuthMiddleware.execute, upload.single("avatar"), userAvatarController.update)

export default avatarRoutes