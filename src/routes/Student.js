/* eslint-disable import/named */
import { Router } from 'express';
import { addStudent,submitReg} from '../controllers/studentController';

const router = Router();

router.post('/add', addStudent);
router.post('/submit', submitReg);


export default router;
