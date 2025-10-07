import productsRouter from '@modules/products/infra/http/routes/ProductRoutes';
import avatarRoutes from '@modules/Users/infra/http/routes/AvatarRoutes';
import sessionsRouter from '@modules/Users/infra/http/routes/SessionRoutes';
import usersRouter from '@modules/Users/infra/http/routes/UserRoutes';
import express, { Router } from 'express';
import updateConfig from '@config/upload'
import passwordRouter from '@modules/Users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/Users/infra/http/routes/ProfileRoutes';
import customerRoutes from '@modules/customers/infra/http/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';

const router = Router();

router.get('/health', (req, res) => {
  return res.json({message: 'hello word'});
})

router.use('/products',productsRouter )
router.use("/users", usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/users/avatar', avatarRoutes)
router.use("/files", express.static(updateConfig.directory))
router.use("/passwords", passwordRouter)
router.use("/profiles", profileRouter)
router.use("/customer", customerRoutes)
router.use("/orders", ordersRouter)

export default router;
