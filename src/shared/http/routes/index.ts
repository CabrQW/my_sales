import productsRouter from '@modules/products/routes/ProductRoutes';
import avatarRoutes from '@modules/Users/routes/AvatarRoutes';
import sessionsRouter from '@modules/Users/routes/SessionRoutes';
import usersRouter from '@modules/Users/routes/UserRoutes';
import express, { Router } from 'express';
import updateConfig from '@config/upload'

const router = Router();
router.get('/health', (req, res) => {
  return res.json({message: 'hello word'});
})

router.use('/products',productsRouter )
router.use("/users", usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/users/avatar', avatarRoutes)
router.use("/files", express.static(updateConfig.directory))

export default router;