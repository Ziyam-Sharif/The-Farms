import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.get('/', getCategories);
router.post('/', authenticateToken, requireRole(['admin']), createCategory);

export default router;
