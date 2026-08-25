import { Router } from 'express';
import { submitContactForm, getContactMessages } from '../controllers/contact.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.post('/', submitContactForm);
router.get('/admin', authenticateToken, requireRole(['admin', 'editor']), getContactMessages);

export default router;
