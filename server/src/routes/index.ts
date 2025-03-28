import { Router } from 'express';
import authRoutes from './auth-routes.js';
import friendRoutes from './friend-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);
router.use('/friends', friendRoutes);

export default router;
