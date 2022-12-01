import {pool} from "../db.js"

export const createVenta = async (req, res) => {
    try{
        const {monto, iva, fecha, movimiento, idMetodoPago, idPedido} = req.body;
        const [rows] = await pool.query('INSERT INTO pedido (subtotal, iva, total, fecha, idCliente) VALUES (?, ?, ?, ?, ?)', 
                        [monto, iva, fecha, movimiento, idMetodoPago, idPedido]);
        res.send({
            id: rows.insertId,
            monto,
            iva,
            fecha,
            movimiento,
            idMetodoPago,
            idPedido
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}