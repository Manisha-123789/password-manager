import express from 'express';
import { createUser, getUser, getUserData, loginUser, resendEmailVerificationLink, verifyEmailToken } from '../controller/user.controller.js';
import { validateCredentials } from '../validator/user.validator.js';
import { protect, validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/password', protect, getUserData);
router.post('/signup', validateCredentials, validateUser, createUser);
router.post('/login', loginUser)
router.get(`/verify/:token`, verifyEmailToken);
router.post('/about/me', protect, getUser);
router.patch('/resend-verification', resendEmailVerificationLink)
export default router;
