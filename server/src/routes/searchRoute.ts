import {Router} from "express";
import { SearchHandler } from "../controllers/searchController";


const router = Router();

router.get("/",SearchHandler)

export default router;