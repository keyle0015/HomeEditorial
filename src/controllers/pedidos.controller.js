import {pool} from "../db.js"

const carrito = [
    {
        idProducto: 1,
        precioUni: 250,
        cantidad: 1,
        monto: 0,
        ivaProd: 0
    },
    {
        idProducto: 2,
        precioUni: 200,
        cantidad: 2,
        monto: 0,
        ivaProd: 0
    }
]
export const createPedido = async (req, res) => {
    try{
        const {subtotal, iva, total, fecha, idCliente} = req.body;
        const [rows] = await pool.query('INSERT INTO pedido (subtotal, iva, total, fecha, idCliente) VALUES (?, ?, ?, ?, ?)', 
                        [subtotal, iva, total, fecha, idCliente]);
        for(var key in carrito){
            var value = carrito[key]
            value['monto'] = value['precio'] * value['cantidad'];
            value['iva'] = value['monto'] * (16/100);
        }
        res.send({
            id: rows.insertId,
            subtotal,
            iva,
            total,
            fecha,
            idCliente
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

//
export const createPedido2 = async (req, res) => {
    try{
        var montoTotal = 0;
        var ivaTotal = 0;
        const {idCliente} = req.body;
        const [row_pedido] = await pool.query('INSERT INTO pedido (idCliente) VALUES (?)', [idCliente]);
        for(var key in carrito){
            var value = carrito[key]
            value['monto'] = value['precioUni'] * value['cantidad'];
            value['ivaProd'] = value['monto'] * (16/100);
        }
        for (var key in carrito){
            var orden = carrito[key];
            const {idProducto, precioUni, cantidad, monto, ivaProd} = orden;
            const [row_orden] = await pool.query('INSERT INTO orden (idPedido, idProducto, precioUni, cantidad, monto, iva) VALUES (?, ?, ?, ?, ?, ?)',
                                [row_pedido.insertId, idProducto, precioUni, cantidad, monto, ivaProd]);
            montoTotal += monto;
            ivaTotal += ivaProd;
        }
        var date = new Date();
        var total = montoTotal + ivaTotal;
        const [row_pedido_final] = await pool.query('UPDATE pedido SET subtotal = ?, iva = ?, total = ?, fecha = ? WHERE idPedido = ?',
                                                    [montoTotal, ivaTotal, total, date, row_pedido.insertId]);
        res.send({
            Pedido: row_pedido.insertId,
            message: 'Pedido realizado con éxito.'
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const createPedido_VO = async (req, res) => {
    try{
        var date = new Date()
        const {noVta, montoTotal, noArt, cantidadProd, noProd, nomProd, descProd, noSerieProd, precioProd} = req.body;
        const [rows] = await pool.query('INSERT INTO pedido (subtotal, iva, total, fecha, idCliente) VALUES (?, ?, ?, ?, ?)', 
                        ["", "", montoTotal, date, 4]);
        res.send({
            id: rows.insertId
            // subtotal,
            // iva,
            // montoTotal,
            // fecha,
            // idCliente
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}