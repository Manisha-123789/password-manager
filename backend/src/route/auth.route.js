import express from 'express';
import { createUser, getUserData, verifyEmailToken } from '../controller/user.controller.js';
import { validateCredentials } from '../validator/user.validator.js';
import { validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/password', getUserData)
router.post('/signup', validateCredentials, validateUser, createUser)
router.get(`/verify/:token`, verifyEmailToken)
export default router;
