/* eslint-disable import/named */
import { Router } from 'express';
import {loginUser,signupUser,getSingleUser} from '../controllers/UsersController';
import {_validateSignup} from '../middlewares/auth';

const router = Router();

router.post('/signup',_validateSignup, signupUser);
router.post('/login', loginUser);
router.get('/:id', getSingleUser);

export default router;
