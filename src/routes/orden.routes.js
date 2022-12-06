import {Router} from 'express';
import { getOrden } from '../controllers/orden.controller.js';

const router = Router ();

router.get('/orden', getOrden)

export default router