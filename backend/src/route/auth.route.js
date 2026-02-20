import express from 'express';
import { createUser } from '../controller/user.controller.js';
import { validateCredentials } from '../validator/user.validator.js';
import { validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/signup', validateCredentials, validateUser, createUser)
export default router;
