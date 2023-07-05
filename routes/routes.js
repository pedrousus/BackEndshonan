const express = require('express');
const multer = require('multer');
const path = require('path');
const fs=require('fs');
const mysql = require('mysql2');

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



router.get('/',(req,res)=>{
    res.send('jola')
})

    router.post('/images/post', filex, (req, res) => {
        const {mimetype, originalname, filename } = req.file;
        const idcolabo = req.body.idcolabo;
        const nombre = req.body.nombre;
        const area=req.body.area;
        const cargo=req.body.cargo;
        const smexcorreo=req.body.smexcorreo;
        const correop=req.body.correop;
        const telefonoper=req.body.telefonoper;
        

        const data = fs.readFileSync(path.join(__dirname, '../images/', filename));
    
        const query = 
        'INSERT INTO imago (type, name, data, ID_Colabo,nombre,area,cargo,correop,telefonoper,correosmex) VALUES (?,?, ?, ?,?,?,?,?,?,?)';
    
        req.getConnection((err, myconn) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error de conexión a la base de datos');
        }
    
        myconn.query(query, [mimetype, originalname, data , idcolabo,nombre,area,cargo,correop,telefonoper,smexcorreo], (err, result) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar la imagen en la base de datos');
            }
    
            res.send('Imagen subida correctamente');
        });
    
        });
    });


    router.post('/im/celu', filex, (req, res) => {
        const {mimetype, originalname, filename } = req.file;
        const IDmovilSmex = req.body.IDmovilSmex;
        const marcaCel = req.body.marcaCel;
        const modeloMovil = req.body.modeloMovil;
        const passMovil=req.body.passMovil;
        const correoMovil=req.body.correoMovil;
        const IMEIcel=req.body.IMEIcel;
        const passCorreo=req.body.passCorreo;
        const componentesCelular=req.body.componentesCelular;
        const renovacionCel=req.body.renovacionCel;
        const IDcolaboCel=req.body.IDColaborador;
    
    
    
        const data = fs.readFileSync(path.join(__dirname, '../images/', filename));
    
        const query = 
        'INSERT INTO movilesSmex (type, name, data,idmovil,marca,modelo,imei,pass,correomo,passcorreo,compocel,renovacioncel,idcolabo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    
        req.getConnection((err, myconn) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error de conexión a la base de datos');
        }
    
        myconn.query(query, [mimetype, originalname, data , IDmovilSmex,marcaCel,modeloMovil,IMEIcel,passMovil,correoMovil,passCorreo,componentesCelular,renovacionCel,IDcolaboCel], (err, result) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar la imagen en la base de datos');
            }
    
            res.send('Imagen subida correctamente');
        });
    
        });
    });
    

    router.post('/images/soft',  (req, res) => {
        const nombreSof = req.body.nombreSoft;
        const usuari = req.body.usuario;
        const contrasenaSof = req.body.constrasenaSoft;
        const codigoAcce = req.body.codigoAcces;
        const getIDequip = req.body.getIDequipo;
        
            if (!nombreSof || !usuari || !contrasenaSof || !codigoAcce) {
            return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
            }
            req.getConnection((err, myconn) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error de conexión a la base de datos');
                }
        
            // Ejecuta la consulta INSERT en la base de datos
            const query = 'INSERT INTO celularessmex (nombreSoft, usuario, contrasena, codigoAcess, IDequipo) VALUES (?,?,?,?,?)';
            const values = [nombreSof, usuari, contrasenaSof, codigoAcce, getIDequip];
        
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

            // Obtener todas las imágenes
    router.get('/images/get', (req, res) => {
        req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
        conn.query('SELECT * FROM imago', (err, rows) => {
            if (err) return res.status(500).send('Fallo al obtener la lista de imágenes');
    
            res.json(rows);
        });
        });
    });

    router.get('/images/geto', (req, res) => {
        req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
        conn.query('SELECT * FROM equipos', (err, rows) => {
            if (err) return res.status(500).send('Fallo al obtener la lista de imágenes');
    
            res.json(rows);
        });
        });
    });
    
    // Obtener una imagen por id
    router.get('/images/get/:id', (req, res) => {
        const id = req.params.id;
    
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
            conn.query('SELECT * FROM imago WHERE id  = ?', [id], (err, rows) => {
                if (err) return res.status(500).send('Fallo al obtener la imagen');
    
                if (rows.length === 0) return res.status(404).send('Imagen no encontrada');
    
                    const {ID_Colabo}= rows[0];
                

                const { mimetype, name, data ,nombre,area,cargo,correop,telefonoper,correosmex} = rows[0];
    
                const image = {
                    mimetype,
                    name,
                    data: Buffer.from(data).toString('base64'),
                    idcolabo: ID_Colabo || null,
                    nombre: nombre || null,
                    area: area || null,
                    cargo: cargo || null,
                    correop: correop || null,
                    telefonoper: telefonoper || null,
                    correosmex: correosmex || null,

                };
                
    
                res.json(image);
                console.log(image)
            });
        });
    });

// segundo endpoint para el empleado


router.get('/images/getxx/:idex', (req, res) => {
    const id = req.params.idex;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Fallo en la conexión a la base de datos');

        conn.query('SELECT * FROM movilesSmex WHERE idcolabo = ?', [id], (err, rows) => {
        if (err) return res.status(500).send('Fallo al obtener los móviles');

        if (rows.length === 0) return res.status(404).send('No se encontraron móviles');

        const mobiles = rows.map(row => ({
            mimetype: row.mimetype,
            name: row.name,
            data: Buffer.from(row.data).toString('base64'),
            marca: row.marca || null,
            idmovil: row.idmovil || null,
            modelo:row.modelo||null,
            imei:row.imei||null,
            pass:row.pass||null,
            correomo:row.correomo||null,
            passcorreo:row.passcorreo||null,
            compocel:row.compocel||null,
            renovacioncel:row.renovacioncel||null

        }));

        res.json({ data: mobiles });
        });
    });
    });




    router.get('/images/getxxequi/:idex', (req, res) => {
        const id = req.params.idex;
    
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
            conn.query('SELECT * FROM equipos WHERE IDcola = ?', [id], (err, rows) => {
            if (err) return res.status(500).send('Fallo al obtener los móviles');
    
            if (rows.length === 0) return res.status(404).send('No se encontraron móviles');
    
            const mobiles = rows.map(row => ({
                mimetype: row.mimetype,
                name: row.name,
                data: Buffer.from(row.data).toString('base64'),
                IDequipo:row.IDequipo,
                tipoDispositivo:row.tipoDispositivo,
                modelo:row.modelo,
                marca:row.marca,
                NoSerieEquipo:row.NoSerieEquipo
            }));
    
            res.json({ data: mobiles });
            });
        });
        });



    router.get('/images/getxxoo/:idex', (req, res) => {
    const id = req.params.idex;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Fallo en la conexión a la base de datos');

        conn.query('SELECT * FROM celularessmex WHERE IDequipo = ?', [id], (err, rows) => {
        if (err) return res.status(500).send('Fallo al obtener los móviles');

        if (rows.length === 0) return res.status(404).send('No se encontraron móviles');

        const mobiles = rows.map(row => ({
            
            nombreSoft: row.nombreSoft || null,
            usuario: row.usuario || null,
            contrasena: row.contrasena || null,
            codigoAcess: row.codigoAcess || null,
            IDsoft: row.IDsoft || null,
        }));

        res.json({ data: mobiles });
        });
    });
    });
    

    router.get('/images/geto/:id', (req, res) => {
        const id = req.params.id;
    
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
            conn.query('SELECT * FROM equipos WHERE id  = ?', [id], (err, rows) => {
                if (err) return res.status(500).send('Fallo al obtener la imagen');
    
                if (rows.length === 0) return res.status(404).send('Imagen no encontrada');

                const { IDequipo } = rows[0];

                conn.query('SELECT * FROM celularessmex WHERE IDequipo = ?', [IDequipo], (err, celulares) => {
                if (err) return res.status(500).send('Fallo al obtener los celulares');
    
                const { mimetype, name, data,tipoDispositivo ,marca,modelo,NoSerieEquipo,ContrasenaEquipo,componentes,modificaciones,estadofisico,detallesIncidentes,garantia,fechaCompra,activo,S_Operativo,MAC,hostname,AUX,N_SerieAux,Pantalla,SerialPantalla,IDcola,usuario} = rows[0];
    
                const image = {
                    mimetype,
                    name,
                    data: Buffer.from(data).toString('base64'),
                    IDequipo: IDequipo || null,
                    tipoDispositivo: tipoDispositivo || null,
                    marca: marca || null,
                    modelo: modelo || null,
                    NoSerieEquipo: NoSerieEquipo || null,
                    ContrasenaEquipo: ContrasenaEquipo || null,
                    componentes: componentes || null,
                    modificaciones: modificaciones || null,
                    estadofisico: estadofisico || null,
                    detallesIncidentes: detallesIncidentes || null,
                    garantia: garantia || null,
                    fechaCompra: fechaCompra || null,
                    activo: activo || null,
                    S_Operativo: S_Operativo || null,
                    MAC: MAC || null,
                    hostname: hostname || null,
                    AUX: AUX || null,
                    N_SerieAux: N_SerieAux || null,
                    Pantalla: Pantalla || null,
                    SerialPantalla: SerialPantalla || null,
                    IDcola: IDcola || null,
                    celulares: celulares.map(celular => ({
                        // ...propiedades de celularesSmex
                        usuario: celular.usuario,
                        contrasena: celular.contrasena,
                        IDsoft:celular.IDsoft
                    }))


                };
    
                res.json(image);
                console.log(image)
            });
            });
        });
    });
    

    router.get('/celularesSmex/:IDequipo', (req, res) => {
        const IDequipo = req.params.IDequipo;
    
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
    
            const query = 'SELECT * FROM celularessmex WHERE IDequipo = ?';
    
            conn.query(query, [IDequipo], (err, rows) => {
                if (err) return res.status(500).send('Fallo al obtener los registros');
    
                res.json(rows);
            });
        });
    });

    router.delete('/images/delete/:idcolax', (req, res) => {
        const IDColaborador = req.params.idcolax;
        
            req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
        
            conn.query('SELECT * FROM imago WHERE ID_Colabo = ?', [IDColaborador], (err, rows) => {
                if (err) return res.status(500).send('Fallo al obtener la imagen');
        
                if (rows.length === 0) return res.status(404).send('Imagen no encontrada');
        
                const { data, name } = rows[0];
                const imagePath = path.join(__dirname, '../images/', name);
        
                conn.query('DELETE FROM imago WHERE ID_Colabo = ?', [IDColaborador], (err) => {
                if (err) return res.status(500).send('Fallo al eliminar la imagen de la base de datos');
        
                fs.unlink(imagePath, (err) => {
                    if (err) console.error('Error al eliminar la imagen:', err);
        
                    res.send('Datos de usuario y imagen eliminados correctamente');
                });
                });
            });
            });
        });


        router.delete('/images/deleteequip/:idcolax', (req, res) => {
            const IDColaborador = req.params.idcolax;
            
                req.getConnection((err, conn) => {
                if (err) return res.status(500).send('Fallo en la conexión a la base de datos');
            
                conn.query('SELECT * FROM equipos WHERE IDequipo = ?', [IDColaborador], (err, rows) => {
                    if (err) return res.status(500).send('Fallo al obtener la imagen');
            
                    if (rows.length === 0) return res.status(404).send('Imagen no encontrada');
            
                    const { data, name } = rows[0];
                    const imagePath = path.join(__dirname, '../images/', name);
            
                    conn.query('DELETE FROM equipos WHERE IDequipo = ?', [IDColaborador], (err) => {
                    if (err) return res.status(500).send('Fallo al eliminar la imagen de la base de datos');
            
                    fs.unlink(imagePath, (err) => {
                        if (err) console.error('Error al eliminar la imagen:', err);
            
                        res.send('Datos de usuario y imagen eliminados correctamente');
                    });
                    });
                });
                });
            });
        

        router.put('/images/update/:idcola', (req, res) => {
            const idcola = req.params.idcola;
            const { getarea, getcargo, getcorreop, getteleper, getSmexcorreo } = req.body;
            
                const query = `
                UPDATE imago
                SET  area = ?, cargo = ?, correop = ?, telefonoper = ?, correosmex = ?
                WHERE ID_Colabo = ?
                `;
            
                req.getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error de conexión a la base de datos');
                }
            
                conn.query(
                    query,
                    [ getarea, getcargo, getcorreop, getteleper, getSmexcorreo, idcola],
                    (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error al actualizar la imagen en la base de datos');
                    }
            
                    res.send('Imagen actualizada correctamente');
                    }
                );
                });
            });



            router.put('/images/update2/:idequip', (req, res) => {
                const idequip = req.params.idequip;
                const { gettipoDi, getmarca, getmodelo, getNoSerieEquipo, getcontraEquipo,getmodifi,getstadofisico,detallesget,getgarantia,getSoperativo,getMAC,gethostname,getAUX,getNserieAUX,pantalaget,serialpantallaget,idcolaequipo } = req.body;
                
                    const query = `
                    UPDATE equipos
                    SET  tipoDispositivo = ?, marca = ?, modelo = ?, NoSerieEquipo = ?, ContrasenaEquipo = ?,modificaciones=?,estadofisico=?,detallesIncidentes=?,garantia=?,S_Operativo=?,MAC=?,hostname=?,AUX=?,N_SerieAux=?,Pantalla=?,SerialPantalla=?,IDcola=?
                    WHERE IDequipo = ?
                    `;
                
                    req.getConnection((err, conn) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error de conexión a la base de datos');
                    }
                
                    conn.query(
                        query,
                        [ gettipoDi, getmarca, getmodelo, getNoSerieEquipo, getcontraEquipo,getmodifi,getstadofisico,detallesget,getgarantia,getSoperativo,getMAC,gethostname,getAUX,getNserieAUX,pantalaget,serialpantallaget,idcolaequipo, idequip],
                        (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error al actualizar la imagen en la base de datos');
                        }
                
                        res.send('Imagen actualizada correctamente');
                        }
                    );
                    });
                });

                router.put('/images/update3/:IDsofto', (req, res) => {
                const IDsofto = req.params.IDsofto;
                const {editedUsuario,editedContra,codigoacEdi  } = req.body;
                
                    const query = `
                    UPDATE celularessmex
                    SET   usuario = ?, contrasena = ?, codigoAcess = ?
                    WHERE IDsoft = ?
                    `;
                
                    req.getConnection((err, conn) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error de conexión a la base de datos');
                    }
                
                    conn.query(
                        query,
                        [  editedUsuario, editedContra, codigoacEdi, IDsofto],
                        (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error al actualizar la imagen en la base de datos');
                        }
                
                        res.send('Imagen actualizada correctamente');
                        }
                    );
                    });
                });

            
            
                router.delete('/images/deletex/:IDsoft', (req, res) => {
                    const IDColaborador = req.params.IDsoft;
                    
                        req.getConnection((err, conn) => {
            
                            conn.query('DELETE FROM celularessmex WHERE IDsoft = ?', [IDColaborador], (err) => {
                            if (err) return res.status(500).send('Fallo al eliminar la imagen de la base de datos');
                    
                            
                    
                                res.send('Datos de usuario y imagen eliminados correctamente');
                            });
                            });
                        });
                    
            router.delete('/images/deletexx2/:id', (req, res) => {
        const id = req.params.id;

        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');

            conn.query('DELETE FROM movilesSmex WHERE idmovil = ?', [id], (err, result) => {
            if (err) return res.status(500).send('Fallo al eliminar el móvil');

            if (result.affectedRows === 0) return res.status(404).send('Móvil no encontrado');

            res.sendStatus(204);
            });
        });
        });



        router.delete('/images/deletexx3/:id', (req, res) => {
        const id = req.params.id;

        req.getConnection((err, conn) => {
            if (err) return res.status(500).send('Fallo en la conexión a la base de datos');

            conn.query('DELETE FROM celularessmex WHERE IDsoft = ?', [id], (err, result) => {
            if (err) return res.status(500).send('Fallo al eliminar el móvil');

            if (result.affectedRows === 0) return res.status(404).send('Móvil no encontrado');

            res.sendStatus(204);
            });
        });
        });
        
                    
            


module.exports=router