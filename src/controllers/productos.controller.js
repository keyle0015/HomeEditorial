import {pool} from '../db.js'

export const getProductos = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM producto')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontraron productos'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
};

export const getProducto = async (req, res) => {
    try{
        const [row] = await pool.query('SELECT * FROM producto WHERE idProducto = ?', [req.params.id])
        if (row.length <= 0) return res.status(404).json({
            message: 'No se encontró el producto'
        })
        const infoProveedor = {
            "tipoProducto": "Libro",
            "categoriaProducto": "Libro"
        }
        Object.assign(row[0], infoProveedor)
        res.json(row[0])
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const createProducto = async (req, res) => {
    try{
        const {nombre, autor, editorial, descripcion, precio, tipoPasta, genero, cantidad} = req.body;
        const [rows] = await pool.query('INSERT INTO producto (nombre, autor, editorial, descripcion, precio, tipoPasta, genero, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                        [nombre, autor, editorial, descripcion, precio, tipoPasta, genero, cantidad]);
        res.send({
            id: rows.insertId,
            nombre,
            autor,
            editorial,
            descripcion,
            precio,
            tipoPasta,
            genero,
            cantidad
        });
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}