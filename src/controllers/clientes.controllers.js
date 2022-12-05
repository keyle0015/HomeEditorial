import {pool} from "../db.js"

export const getClientes = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM cliente')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontró ningún cliente'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const getCliente = async (req, res) => {
    try{
        const [row] = await pool.query('SELECT * FROM cliente WHERE idCliente = ?', [req.params.id])
        if (row.length <= 0) return res.status(404).json({
            message: 'No se encontró el cliente '
        })
        res.json(row[0])
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const createClientes = async (req, res) => {
    try{
        const {nombre, correoElec, password, telefono, rfc} = req.body;
        const [rows] = await pool.query('INSERT INTO cliente (nombre, correoElec, password, telefono, rfc) VALUES (?, ?, ?, ?, ?)', 
                        [nombre, correoElec, password, telefono, rfc]);
        res.send({
            id: rows.insertId,
            nombre,
            correoElec,
            telefono,
            rfc
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const updateClientes = (req, res) => res.send('Actualizando clientes');

export const deleteClientes = (req, res) => res.send('Eliminando clientes');