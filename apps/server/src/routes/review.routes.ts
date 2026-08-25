import { Router } from 'express';
import { getProductReviews, createReview, approveReview } from '../controllers/review.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.get('/products/:productId/reviews', getProductReviews);
router.post('/products/:productId/reviews', authenticateToken, createReview);
router.patch('/admin/reviews/:id/approve', authenticateToken, requireRole(['admin']), approveReview);

export default router;
