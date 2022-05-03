import { Router } from 'express';
import passport from 'passport';
import { check } from 'express-validator';

import { login, register, googleLogin, googleRegister } from '../controllers/authController.js'
import errorValidator from '../helpers/errorValidation.js';


const router = Router();

router.get('/login/google', passport.authenticate('auth-google-login', { scope: ['profile', 'email'], session: false }), googleLogin);

router.get('/register/google', passport.authenticate('auth-google-register', { scope: ['profile', 'email'], session: false }), googleRegister);

router.post('/login', [
    check('email', 'Email must have a valid format').isEmail(),
    check('password', 'Password must have a length between 6 and 12 characters').isLength({ min: 6, max: 12 }),
    errorValidator
], login);

router.post('/register', [
    check('username', 'Username must have a length between 4 and 20 characters').isLength({ min: 4, max: 20 }),
    check('email', 'Email must have a valid format').isEmail(),
    check('password', 'Password must have a length between 6 and 12 characters').isLength({ min: 6, max: 12 }),
    errorValidator
], register);

export default router;