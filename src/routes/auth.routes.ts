import { Router } from 'express';
import {
  register as signup,
  login as signin,
  refreshToken,
  logout as signout,
} from '@/controllers/auth.controller';

const router: Router = Router();

/**
 * @route   POST /auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /auth/login
 * @desc    Login user and return JWT tokens
 * @access  Public
 */
router.post('/login', signin);

/**
 * @route   POST /auth/refresh-token
 * @desc    Refresh access token using refresh token
 * @access  Public (requires refresh token in cookie)
 */
router.post('/refresh-token', refreshToken);

/**
 * @route   POST /auth/logout
 * @desc    Logout user and clear tokens
 * @access  Protected (optional - works with or without auth)
 */
router.post('/logout', signout);

export default router;
