import express from "express"
import clientesRoutes from './routes/clientes.routes.js'
import productosRoutes from './routes/productos.routers.js'
import metodopagoRoutes from './routes/metodopago.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import enviosRoutes from './routes/envios.router.js'
import ordenRoutes from './routes/orden.routes.js'
import pingRoute from './routes/ping.routes.js'

const app = express()

app.use(express.json())

app.use(pingRoute)
app.use('/api', clientesRoutes)
app.use('/api', metodopagoRoutes)
app.use('/api', productosRoutes)
app.use('/api', pedidosRoutes)
app.use('/api', ventasRoutes)
app.use('/api', enviosRoutes)
app.use('/api', ordenRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'API Not found'
    })
})

export default app