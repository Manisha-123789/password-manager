import { body } from 'express-validator';
import { User } from '../model/auth.model.js';

export const validateCredentials = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email')
    .bail()
    .normalizeEmail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value }).lean();

      if (existingUser) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }

      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .bail()
    .isStrongPassword()
    .withMessage('Password must include uppercase, lowercase, number and symbol'),
    
    body('userName')
    .notEmpty()
    .withMessage('User name is required')
    .isLength({min : 3})
    .withMessage('Minimum lenght must be at least 3 characters')
];