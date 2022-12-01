import { Router } from "express";
import { createMetodoPago, getMetodosPago, getMetodoPago } from "../controllers/metodopago.controller.js";


const router = Router()

router.get('/metodopago', getMetodosPago)

router.get('/metodopago/:id', getMetodoPago)

router.post('/metodopago', createMetodoPago)

export default router
