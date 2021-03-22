import { Router } from "express";
import { getCourse} from "../controllers/course";

const router = Router();


router.get("/", getCourse);


export default router;
