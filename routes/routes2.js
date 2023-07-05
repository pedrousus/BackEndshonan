const express = require('express');
const multer = require('multer');
const path = require('path');
const fs=require('fs');
const router = express.Router()




const diskStorage= multer.diskStorage({
    destination: path.join(__dirname,'../images'),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-monkeywit-'+file.originalname)
    }
})
const filex = multer({
    storage:diskStorage
}).single('image')


router.post('/posto/equipo', filex, (req, res) => {
    const { mimetype, originalname, filename } = req.file;
    const IDequipo = req.body.IDequipo;
    const tipoS = req.body.tipoS;
    const marca = req.body.marca;
    const modelo=req.body.modelo;
    const NoSerieEquip=req.body.NoSerieEquip;
    const contraEquipo=req.body.contraEquipo;
    const componente=req.body.componente;
    const modificciones=req.body.modificciones;
    const estadoFisico=req.body.estadoFisico;
    const incidentes=req.body.incidentes;
    const garantia=req.body.garantia;
    const fechaCompra=req.body.fechaCompra;
    const sistemaoperativo=req.body.sistemaoperativo;
    const MAc=req.body.MAc;
    const hostname=req.body.hostname;
    const NoSerieAUx=req.body.NoSerieAUx;
    const activo=req.body.activo;
    const aux=req.body.aux;
    const pantall=req.body.pantall;
    const serialPantalla=req.body.serialPantalla;
    const IDcola=req.body.IDcola;

    const data = fs.readFileSync(path.join(__dirname, '../images/', filename));

    const query = 
    'INSERT INTO equipos (type, name, data,IDequipo, tipoDispositivo,marca,modelo,NoSerieEquipo,ContrasenaEquipo,componentes,modificaciones,estadofisico,detallesIncidentes,garantia,fechaCompra,activo,S_Operativo,MAC,hostname,AUX,N_SerieAux,Pantalla,SerialPantalla,IDcola) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    req.getConnection((err, myconn) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error de conexión a la base de datos');
    }

    myconn.query(query, [mimetype, originalname, data , IDequipo,tipoS,marca,modelo,NoSerieEquip,contraEquipo,componente,modificciones,estadoFisico,incidentes,garantia,fechaCompra,activo,sistemaoperativo,MAc,hostname,NoSerieAUx,aux,pantall,serialPantalla,IDcola], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Error al insertar la imagen en la base de datos');
        }

        res.send('Imagen subida correctamente');
    });

    });
});





router.post('/im/soft',filex,  (req, res) => {
    const IDsoft = req.body.IDsoft;
    const nombreso = req.body.nombresof;
    const usuario = req.body.usuario;
    const constrasenasof = req.body.constrasenasof;
    const codigoacc = req.body.codigoacc;
    const getIDequipo = req.body.getIDequipo;
                    
    
    
        if (!nombreso || !usuario || !constrasenasof || !codigoacc) {
            console.log(nombreso,usuario,constrasenasof,codigoacc,getIDequipo)
        return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
        
        }
        req.getConnection((err, myconn) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error de conexión a la base de datos');
            }
    
        // Ejecuta la consulta INSERT en la base de datos
        const query = 'INSERT INTO celularessmex (nombreSoft, usuario, contrasena, codigoAcess, IDequipo,IDsoft) VALUES (?,?,?,?,?,?)';
        const values = [nombreso, usuario, constrasenasof, codigoacc, getIDequipo,IDsoft];
    
        // Ejecutar la consulta utilizando tu módulo de base de datos
        myconn.query(query, values, (error, result) => {
        if (error) {
            console.error('Error al guardar el registro:', error);
            return res.status(500).json({ error: 'Ocurrió un error al guardar el registro.' });
        }
    
        // Respuesta de éxito
        res.status(200).send('Empleado Subido');
        });
    })
    });

module.exports=router