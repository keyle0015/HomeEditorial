import { Router } from "express";
import { solicTrans } from "../controllers/envios.controllers.js";

const router = Router();

router.get('/solicTrans/:id', solicTrans);

export default router