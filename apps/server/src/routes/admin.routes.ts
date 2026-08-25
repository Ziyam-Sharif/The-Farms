import { Router } from 'express';
import { getDashboardStats, getAuditLogs } from '../controllers/admin.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.get('/dashboard/stats', authenticateToken, requireRole(['admin', 'editor']), getDashboardStats);
router.get('/audit-log', authenticateToken, requireRole(['admin']), getAuditLogs);

export default router;
