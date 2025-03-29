import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mediaRouter } from './mediaRoutes.js';

// Initialize the main application router
const router = Router();
// Route for user-related operations
router.use('/users', userRouter);

// Route for media-related operations
router.use('/media', mediaRouter);



export default router;
