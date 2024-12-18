import express from 'express';
import { createComement, getPostComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,createComement);
router.get('/getPostComments/:postId', getPostComments);

export default router;