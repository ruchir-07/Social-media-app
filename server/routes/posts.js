import express from 'express'
import { getFeedPosts, getUserPosts, likePost } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* READ */
// router.get('/feed/:id', verifyToken, getFeedPosts);
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;