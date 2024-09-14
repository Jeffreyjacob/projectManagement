import {Router} from "express";
import {createProjectHandler, getProjectHandler } from "../controllers/projectController";


const router = Router();

router.get("/",getProjectHandler);
router.post("/",createProjectHandler);

export default router;