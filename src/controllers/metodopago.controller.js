import {pool} from "../db.js"

export const getMetodosPago = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM metodopago')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontró ningún método de pago'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
};

export const getMetodoPago = async (req, res) => {
    try{
        const [row] = await pool.query('SELECT * FROM metodopago WHERE idMetodoPago = ?', [req.params.id])
        if (row.length <= 0) return res.status(404).json({
            message: 'No se encontró el método de pago '
        })
        const monto = {'monto': 1000}
        Object.assign(row[0], monto)
        res.json(row[0])
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const createMetodoPago = async (req, res) => {
    try{
        const {numTarjeta, nombre, fechaVen, cvv, idCliente} = req.body;
        const [rows] = await pool.query('INSERT INTO metodopago (numTarjeta, nombre, fechaVen, cvv, idCliente) VALUES (?, ?, ?, ?, ?)', 
                        [numTarjeta, nombre, fechaVen, cvv, idCliente]);
        res.send({
            id: rows.insertId,
            numTarjeta,
            nombre,
            fechaVen,
            cvv,
            idCliente
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}