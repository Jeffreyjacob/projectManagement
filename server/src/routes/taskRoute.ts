import {Router} from "express";
import { createTask, getTask, getUserTask, UpdateTaskStatus } from "../controllers/taskController";


const router = Router()

router.get("/",getTask);
router.post("/",createTask)
router.patch("/:taskId",UpdateTaskStatus)
router.get("/user/:id",getUserTask)

export default router;