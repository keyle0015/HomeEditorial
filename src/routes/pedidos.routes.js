import {Router} from 'express';
import { createPedido, createPedido_VO } from '../controllers/pedidos.controller.js';
import { createPedido2, getPedidos, getPedido } from '../controllers/pedidos.controller.js';

const router = Router()

router.get('/pedidos', getPedidos)

router.get('/pedidos/:id', getPedido)

router.post('/pedidos', createPedido)

router.post('/pedidoVO', createPedido_VO)

router.post('/pedido2', createPedido2)

export default router