import { Router } from 'express';
import { getBlogPosts, getBlogPostBySlug, createBlogPost } from '../controllers/blog.controller';
import { authenticateToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';

const router: Router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/admin', authenticateToken, requireRole(['admin', 'editor']), createBlogPost);

export default router;
