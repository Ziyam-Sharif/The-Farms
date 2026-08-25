import { Router } from 'express';
import { subscribeNewsletter, exportNewsletterCSV } from '../controllers/newsletter.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.post('/subscribe', subscribeNewsletter);
router.get('/admin/export', authenticateToken, requireRole(['admin']), exportNewsletterCSV);

export default router;
