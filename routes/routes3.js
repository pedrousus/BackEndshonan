const express = require('express');

const router = express.Router()

router.post('/im/softo', (req, res) => {
    const nombresof = req.body.nombresof;
    const usuario = req.body.usuario;
    const constrasenasof = req.body.constrasenasof;
    const codigoacc = req.body.codigoacc;
    const getIDequipo = req.body.getIDequipo;
    
    if (!nombresof || !usuario || !constrasenasof || !codigoacc) {
        console.log(nombresof,usuario,constrasenasof,codigoacc,getIDequipo)
    return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
    
    }
    
        const query = "INSERT INTO equipos (nombreSoft, usuario, contrasena, codigoAcess,IDequipo) VALUES (?, ?, ?, ?, ?)";
        connection.query(query, [nombresof, usuario, constrasenasof, codigoacc, getIDequipo], (err, result) => {
        if (err) {
            console.error('Error al insertar los datos en la tabla equipos: ' + err.stack);
            res.status(500).send("Error al insertar los datos en la base de datos.");
            return;
        }
        console.log(result);
        res.send("Empleado Subido");
        });
    });



module.exports=router