import express from 'express';
import { newUserRegistration, userLogin, userLogout } from '../Controllers/user.controller.js';

const router = express.Router();

// user signup route
router.post('/signup', newUserRegistration);

// user login route
router.post('/login', userLogin);

// user logout route
router.get('/logout', userLogout);

export default router;