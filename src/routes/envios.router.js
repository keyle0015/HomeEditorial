import { Router } from "express";
import { solicTrans, estTransp, getEnvios } from "../controllers/envios.controllers.js";

const router = Router();

router.get('/solicTrans/:id', solicTrans);

router.post('/estado_transporte', estTransp);

router.get('/envios', getEnvios)

export default router