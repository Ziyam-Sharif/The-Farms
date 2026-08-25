import { Router } from 'express';
import {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { authenticateToken } from '../middlewares/auth';
import { authRateLimiter } from '../config/security';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validations/auth.validation';

const router: Router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), register);
router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/logout-all', authenticateToken, logoutAll);
router.post('/forgot-password', authRateLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/me', authenticateToken, getMe);

export default router;
