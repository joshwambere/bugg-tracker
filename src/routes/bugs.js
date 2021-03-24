import { Router } from "express";
import { addBug,UpdateBugs,getBugs,deleteBug} from "../controllers/BugsController";
import {_isLoggedIn} from '../middlewares/auth'
import {_validateBug} from '../middlewares/bug'

const router = Router();


router.post("/add",_isLoggedIn,_validateBug, addBug);
router.put("/update/:id",_isLoggedIn,_validateBug,UpdateBugs)
router.get("/",_isLoggedIn,getBugs)
router.delete("/delete/:id",_isLoggedIn,deleteBug)


export default router;
