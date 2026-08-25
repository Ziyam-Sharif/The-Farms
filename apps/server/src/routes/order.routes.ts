import { Router } from 'express';
import {
  createOrder,
  getOrderByNumber,
  getAdminOrders,
  updateOrderStatus,
} from '../controllers/order.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

import { orderRateLimiter } from '../config/security';

const router: Router = Router();

router.post('/', orderRateLimiter, createOrder);
router.get('/track/:orderNumber', getOrderByNumber);

// Admin Order Management
router.get('/admin/all', authenticateToken, requireRole(['admin', 'editor']), getAdminOrders);
router.patch('/admin/:id/status', authenticateToken, requireRole(['admin', 'editor']), updateOrderStatus);

export default router;
