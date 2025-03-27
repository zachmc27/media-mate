import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mediaRouter } from './mediaRoutes.js';

const router = Router();

router.use('/users', userRouter);

router.use('/media', mediaRouter);

export default router;
