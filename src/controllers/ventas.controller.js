import {pool} from "../db.js"


export const createVenta = async (req, res) => {
    try{
        const {fecha,movimiento,idMetodoPago,idPedido} = req.body;
        const [row_venta] = await pool.query('INSERT INTO venta (fecha, movimiento, idMetodoPago, idPedido) VALUES (?, ?, ?, ?)',
                                [fecha, movimiento, idMetodoPago,idPedido]);
        res.send({
            message: 'venta realizada con éxito.'
        })
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const getVenta = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM venta')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontró ninguna Venta'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
};