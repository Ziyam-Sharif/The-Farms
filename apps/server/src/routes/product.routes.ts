import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Role-gated Admin / Editor routes
router.post('/', authenticateToken, requireRole(['admin', 'editor']), createProduct);
router.put('/:id', authenticateToken, requireRole(['admin', 'editor']), updateProduct);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteProduct);

export default router;
