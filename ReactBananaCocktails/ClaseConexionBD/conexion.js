import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(cors());
app.use(express.json());

const connectionConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "bananacocktailsreact",
};

// Middleware para manejar las consultas a la base de datos
const queryMiddleware = (req, res, next) => {
    const connection = mysql.createConnection(connectionConfig);

    req.db = connection;

    res.on("finish", () => {
        connection.end();
    });

    next();
};

// Middleware para manejar errores
const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error interno del servidor");
};

app.use(queryMiddleware);

// Rutas cliente
//Todos los clientes
app.get('/cliente', (req, res, next) => {
    //req.db= connection
    req.db.query("SELECT * FROM cliente", (error, results) => {
        if (error) {
            console.error('Error al obtner los clientes NODE', error)
            return next(error);
        }

        // Formatea la fecha en el formato deseado (YYYY-MM-DD)
        const clientesFormateados = results.map(cliente => {
            return {
                ...cliente,
                FECHANACIMIENTOU: cliente.FECHANACIMIENTOU.toISOString().split('T')[0]
            };
        });

        res.json(clientesFormateados);
        console.log('Datos de los clientes:', clientesFormateados);

    });
});

app.get('/cliente/:IDCLIENTE', (req, res, next) => {
    const IDCLIENTE = req.params.IDCLIENTE;
    console.log('ID del cliente Backend:', IDCLIENTE);
    req.db.query(`SELECT * FROM cliente AS cliente WHERE cliente.IDCLIENTE=${IDCLIENTE}`, (error, results) => {
        if (error) {
            console.error('Error al obtener el cliente en el backend', error)
            return next(error);
        }

        // Formatea la fecha en el formato deseado (YYYY-MM-DD)
        const clientesFormateados = results.map(cliente => {
            return {
                ...cliente,
                FECHANACIMIENTOU: cliente.FECHANACIMIENTOU.toISOString().split('T')[0]
            };
        });

        res.json(clientesFormateados);
        console.log('Datos de los clientes:', clientesFormateados);

        console.log('Datos del cliente:', clientesFormateados);
    });
});


app.post('/cliente', (req, res, next) => {
    console.log('Datos del cliente:', req.body);
    const { NOMBREU, APELLIDOU, FECHANACIMIENTOU, CELULARU, EMAILU, PASSWORDU, ESADMINU, ACTIVOU, DOMICILIOCLI, CEDULACLI } = req.body;

    const query = `INSERT INTO cliente (NOMBREU, APELLIDOU, FECHANACIMIENTOU, CELULARU, EMAILU, PASSWORDU, ESADMINU, ACTIVOU, DOMICILIOCLI, CEDULACLI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Array de valores que se insertarán en la consulta
    const values = [NOMBREU, APELLIDOU, FECHANACIMIENTOU, CELULARU, EMAILU, PASSWORDU, ESADMINU, ACTIVOU, DOMICILIOCLI, CEDULACLI];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar cliente:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de cliente creado correctamente',
            clienteId: results.insertId
        });
    });
});


app.put('/cliente/:IDCLIENTE', (req, res, next) => {
    const IDCLIENTE = req.params.IDCLIENTE;

    const { NOMBREU, APELLIDOU, FECHANACIMIENTOU, CELULARU, EMAILU, PASSWORDU, ESADMINU, ACTIVOU, DOMICILIOCLI, CEDULACLI } = req.body;

    // Ajusta las columnas que deseas actualizar
    const query = `UPDATE cliente SET NOMBREU=?, APELLIDOU=?, FECHANACIMIENTOU=?, CELULARU=?, EMAILU=?, PASSWORDU=?, ESADMINU=?, ACTIVOU=?, DOMICILIOCLI=?, CEDULACLI=? WHERE IDCLIENTE=${IDCLIENTE}`;

    const values = [NOMBREU, APELLIDOU, FECHANACIMIENTOU, CELULARU, EMAILU, PASSWORDU, ESADMINU, ACTIVOU, DOMICILIOCLI, CEDULACLI];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar cliente:', error);
            return next(error);
        }

        res.json({
            message: 'Registro de cliente actualizado correctamente',
        });
    });
});

//Borrar sin borrar, solo ponerle inactivo
app.put('/desactivarCliente/:IDCLIENTE', (req, res, next) => {
    const IDCLIENTE = req.params.IDCLIENTE;
    const query = `UPDATE cliente SET ACTIVOU=0 WHERE IDCLIENTE=${IDCLIENTE}`;
    req.db.query(query, (error, results) => {
        if (error) {
            console.error('Error al borrar cliente:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de cliente desactivado correctamente',
        });
    });
});


//Rutas administrador
//Todos los admins
app.get('/administrador', (req, res, next) => {
    req.db.query("SELECT * FROM administrador", (error, results) => {
        if (error) {
            console.error('Error al obtner los adminitradores NODE', error)
            return next(error);
        }

        res.json(results);
    });
});



//Rutas SECCION
//secciones activas
app.get('/seccion', (req, res, next) => {
    //req.db= connection
    req.db.query("SELECT * FROM seccion WHERE ACTIVASEC=1", (error, results) => {
        if (error) {
            console.error('Error al obtener las secciones NODE', error)
            return next(error);
        }

        res.json(results);
    });
});
//secciones inactivas
app.get('/seccionInactiva', (req, res, next) => {
    //req.db= connection
    req.db.query("SELECT * FROM seccion WHERE ACTIVASEC=0", (error, results) => {
        if (error) {
            console.error('Error al obtener las secciones NODE', error)
            return next(error);
        }

        res.json(results);
    });
});
//ver una seccion en especifico por su ID
app.get('/seccion/:IDSECCION', (req, res, next) => {
    const IDSECCION = req.params.IDSECCION;

    req.db.query(`SELECT * FROM seccion WHERE IDSECCION=${IDSECCION}`, (error, results) => {
        if (error) {
            console.error('Error al obtener la seccion NODE', error)
            return next(error);
        }

        res.json(results);
    });
});

//insertar una seccion
app.post('/seccion', (req, res, next) => {
    const { NOMBRESEC, ACTIVASEC } = req.body;

    const query = `INSERT INTO seccion (NOMBRESEC, ACTIVASEC) VALUES (?, ?)`;

    // Array de valores que se insertarán en la consulta
    const values = [NOMBRESEC, ACTIVASEC];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar seccion:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de seccion creado correctamente',
            seccionId: results.insertId // ID de la nueva seccion insertado
        });
    });
});
//Actualizar una seccion
app.put('/seccion/:IDSECCION', (req, res, next) => {
    const IDSECCION = req.params.IDSECCION;

    const { NOMBRESEC, ACTIVASEC } = req.body;

    // Ajusta las columnas que deseas actualizar
    const query = `UPDATE seccion SET NOMBRESEC=?, ACTIVASEC=? WHERE IDSECCION=${IDSECCION}`;

    const values = [NOMBRESEC, ACTIVASEC];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar seccion:', error);
            return next(error);
        }

        res.json({
            message: 'Registro actualizado correctamente',
        });
    });
});

//borrar seccion sin borrarla, solo inhabilitarla
app.put('/desactivarSeccion/:IDSECCION', (req, res, next) => {
    const IDSECCION = req.params.IDSECCION;
    const query = `UPDATE seccion SET ACTIVASEC=0 WHERE IDSECCION=${IDSECCION}`;
    req.db.query(query, (error, results) => {
        if (error) {
            console.error('Error al borrar seccion:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de seccion desactivado correctamente',
        });
    });
});

//RUTAS COCTEL
//viendo los cocteles activos
app.get('/coctel', (req, res, next) => {
    req.db.query("SELECT * FROM coctel WHERE ACTIVOC = 1", (error, results) => {
        if (error) {
            console.error('Error al obtener los cocteles NODE', error)
            return next(error);
        }

        res.json(results);
    });
});
//ver los cocteles inactivos    
app.get('/coctelInactivo', (req, res, next) => {
    req.db.query("SELECT * FROM coctel WHERE ACTIVOC = 0", (error, results) => {
        if (error) {
            console.error('Error al obtener los cocteles NODE', error)
            return next(error);
        }

        res.json(results);
    });
});
//ver un coctel en especifico por su ID
app.get('/coctel/:IDCOCTEL', (req, res, next) => {
    const IDCOCTEL = req.params.IDCOCTEL;

    req.db.query(`SELECT * FROM coctel WHERE IDCOCTEL=${IDCOCTEL}`, (error, results) => {
        if (error) {
            console.error('Error al obtener el coctel por su ID', error)
            return next(error);
        }

        res.json(results);
    });
});
//ver los cocteles de una seccion en especifico
app.get('/coctelSeccion/:IDSECCION', (req, res, next) => {
    const IDSECCION = req.params.IDSECCION;

    req.db.query(`SELECT * FROM coctel WHERE IDSECCION=${IDSECCION}`, (error, results) => {
        if (error) {
            console.error('Error al obtener el coctel por Coleccion', error)
            return next(error);
        }

        res.json(results);
    });
});
//ver los cocteles que coinciden con la busqueda por nombre
app.get('/coctelNombre/:NOMBREC', (req, res, next) => {
    const NOMBREC = req.params.NOMBREC;

    req.db.query(`SELECT * FROM coctel WHERE NOMBREC LIKE '%${NOMBREC}%'`, (error, results) => {
        if (error) {
            console.error('Error al obtener el coctel por Nombre', error)
            return next(error);
        }

        res.json(results);
    });
});

//insertar un coctel
app.post('/coctel', (req, res, next) => {
    const { IDSECCION, IDADMINISTRADOR, NOMBREC, DESCRIPCIONC, PRECIOUNITARIOC, IMAGENC, ACTIVOC } = req.body;
    console.log('Datos del coctel a insertar:', req.body);
    const query = `INSERT INTO coctel (IDSECCION, IDADMINISTRADOR, NOMBREC, DESCRIPCIONC, PRECIOUNITARIOC, IMAGENC, ACTIVOC) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Array de valores que se insertarán en la consulta
    const values = [IDSECCION, IDADMINISTRADOR, NOMBREC, DESCRIPCIONC, PRECIOUNITARIOC, IMAGENC, ACTIVOC];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar coctel:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de coctel creado correctamente',
            coctelId: results.insertId
        });
    });
});

//Actualizar un coctel
app.put('/coctel/:IDCOCTEL', (req, res, next) => {
    const IDCOCTEL = req.params.IDCOCTEL;

    const { IDSECCION, IDADMINISTRADOR, NOMBREC, DESCRIPCIONC, PRECIOUNITARIOC, IMAGENC, ACTIVOC } = req.body;

    // Ajusta las columnas que deseas actualizar
    const query = `UPDATE coctel SET IDSECCION=?, IDADMINISTRADOR=?, NOMBREC=?, DESCRIPCIONC=?, PRECIOUNITARIOC=?, IMAGENC=?, ACTIVOC=? WHERE IDCOCTEL=${IDCOCTEL}`;

    const values = [IDSECCION, IDADMINISTRADOR, NOMBREC, DESCRIPCIONC, PRECIOUNITARIOC, IMAGENC, ACTIVOC];

    req.db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar coctel:', error);
            return next(error);
        }

        res.json({
            message: 'Registro actualizado correctamente',
        });
    });
});

//Borrar sin borrar, solo ponerle inactivo
app.put('/desactivarCoctel/:IDCOCTEL', (req, res, next) => {
    const IDCOCTEL = req.params.IDCOCTEL;
    const query = `UPDATE coctel SET ACTIVOC=0 WHERE IDCOCTEL=${IDCOCTEL}`;
    req.db.query(query, (error, results) => {
        if (error) {
            console.error('Error al borrar coctel:', error);
            return next(error);
        }
        res.json({
            message: 'Registro de coctel desactivado correctamente',
        });
    });
});



app.use(errorMiddleware);

app.listen(8000, () => {
    console.log('Servidor corriendo en http://localhost:8000/');
});
