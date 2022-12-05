import { Router } from "express";
import { solicTrans, estTransp } from "../controllers/envios.controllers.js";

const router = Router();

router.get('/solicTrans/:id', solicTrans);

router.post('/estado_transporte', estTransp);

export default router