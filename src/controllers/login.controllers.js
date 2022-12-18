import {pool} from "../db.js"


export const getLogin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password

    try{
        const [row] = await pool.query('SELECT * FROM cliente WHERE correoElec = ? and password= ?' ,
                                        [email, password])
        if (row.length <= 0) return res.status(404).json({
            message: 'No se encontró el cliente '
        })
        else{
            res.send('Correo electrónico y/o contraseña incorrecta')
        }
        res.json(row[0])
    }catch (error){
        return res.status(500).json({
            message: 'Algo salió mal'

        })
    }
}