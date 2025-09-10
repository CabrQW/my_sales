import productsRouter from '@modules/products/routes/ProductRoutes';
import { Router } from 'express';

const router = Router();
router.get('/health', (req, res) => {
  return res.json({message: 'hello word'});
})

router.use('/products',productsRouter )

export default router;