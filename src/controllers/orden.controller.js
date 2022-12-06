import {pool} from "../db.js"

export const getOrden = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM orden')
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontró ninguna orden'
        })
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}