import productsRouter from '@modules/products/routes/ProductRoutes';
import usersRouter from '@modules/Users/routes/UserRoutes';
import { Router } from 'express';

const router = Router();
router.get('/health', (req, res) => {
  return res.json({message: 'hello word'});
})

router.use('/products',productsRouter )
router.use("/users", usersRouter)

export default router;