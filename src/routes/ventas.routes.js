import { Router } from "express";
import { createVenta } from "../controllers/ventas.controller.js";

const router = Router()

router.post('/ventas', createVenta)

export default router