import { Router } from 'express';

const router = Router();
router.get('/health', (req, res) => {
  return res.json({message: 'hello word'});
})

export default router;