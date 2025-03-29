import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mediaRouter } from './mediaRoutes.js';
import { seenItListRouter } from './seenItList-routes.js';
import { toWatchListRouter } from './toWatch-routes.js';
import friendRoutes from './friend-routes.js';

// Initialize the main application router
const router = Router();
// Route for user-related operations
router.use('/users', userRouter);

// Route for media-related operations
router.use('/media', mediaRouter);

// Route for friend-related operations
router.use('/friends', friendRoutes);

// Route for seenit-related operations
router.use('/seen', seenItListRouter);

// Route for seenit-related operations
router.use('/towatch', toWatchListRouter);

export default router;
