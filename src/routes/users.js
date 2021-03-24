/* eslint-disable import/named */
import { Router } from 'express';
import {loginUser,signupUser} from '../controllers/UsersController';
import {_validateSignup} from '../middlewares/auth';

const router = Router();

router.post('/signup',_validateSignup, signupUser);
router.post('/login', loginUser);


export default router;
