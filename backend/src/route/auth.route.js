import express from 'express';
import { createUser, getUserData, verifyEmailToken } from '../controller/user.controller.js';
import { validateCredentials } from '../validator/user.validator.js';
import { protect, validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/password', protect, getUserData)
router.post('/signup', validateCredentials, validateUser, createUser)
router.get(`/verify/:token`, verifyEmailToken)
export default router;
