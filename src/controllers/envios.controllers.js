import {pool} from "../db.js"


export const getEnvios = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM envio')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontró ningún envío'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const solicTrans = async (req, res) => {
    try{
        const date = new Date();
        const [row] = await pool.query("SELECT O.idPedido as 'NoVta', PR.nombre as 'Producto', CONCAT(DIR.ciudad, ', ', DIR.estado) as 'NombreDest',\n"+
                    "CONCAT(DIR.calle, ' #', DIR.numeroExt, ' Colonia ', DIR.colonia) as 'DirDest', DIR.comentarios as 'Instrucciones de entrega' FROM orden O \n"+
                    "INNER JOIN producto PR ON O.idProducto = PR.idProducto\n"+
                    "INNER JOIN pedido PE ON O.idPedido = PE.idPedido\n"+
                    "INNER JOIN direccion DIR ON DIR.idCliente = PE.idCliente\n"+
                    "WHERE PE.idPedido = ?", [req.params.id]);
        const info = {"DirOrig": "Dirección de prueba", "fechaEntr": date};
        Object.assign(row[0], info);
        if (row.length <= 0) return res.status(404).json({
            message: 'Algo salió mal. No se pudo realizar la solicitud de transporte.'
        })
        res.json(row[0])
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal. No se pudo realizar la solicitud de transporte.'
        })
    }
}


export const estTransp = async (req, res) => {
    try{
        const {edoEntr, NoGuia, NoVta, fecha} = req.body
        const [row_transp] = await pool.query('INSERT INTO envio (claveRastreo, fechaEntrega, estadoEnvio, idPedido) VALUES (?, ?, ?, ?)',
                                                [NoGuia, fecha, edoEntr, NoVta]);
        res.json({
            message: 'Entrega registrada con éxito',
            estadoEntrega: edoEntr,
            fechaEntrega: fecha
        })
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal. No se pudo recibir el estado de transporte.'
        })
    }
}