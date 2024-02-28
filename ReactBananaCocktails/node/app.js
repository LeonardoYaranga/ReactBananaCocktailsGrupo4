
import express from "express"
import cors from "cors";

//importamos la conexion a la base de datos
import db from './database/db.js';
//importamos nuestro enrutador
import routes from './routes/routes.js';

const app = express()

app.use(cors());
app.use(express.json());
app.use('/', routes);

try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');   
}catch(error){
    console.log(`No se pudo conectar a la base de datos: ${error}`);
}

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.listen(8000, () => {
    console.log('Servidor corriendo en http://localhost:8000/')
})

