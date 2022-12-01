import { Router } from "express";
import { getProductos, getProducto } from "../controllers/productos.controller.js";
import { createProducto } from "../controllers/productos.controller.js";

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:id', getProducto)

router.post('/productos', createProducto)

export default router