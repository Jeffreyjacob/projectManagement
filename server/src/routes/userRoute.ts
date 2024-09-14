import {Router} from "express";
import { GetUserhandler } from "../controllers/userController";

const router = Router();

router.get("/",GetUserhandler)

export default router;