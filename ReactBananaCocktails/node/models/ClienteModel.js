//importamos la conexion a la base de datos
import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize';

const ClienteModel = db.define('cliente', {
    IDCLIENTE: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOMBREU: { type: DataTypes.STRING },
    APELLIDOU: { type: DataTypes.STRING },
    FECHANACIMIENTOU: { type: DataTypes.DATE },
    CELULARU: { type: DataTypes.STRING },
    EMAILU: { type: DataTypes.STRING },
    PASSWORDU: { type: DataTypes.STRING },
    ESADMINU: { type: DataTypes.BOOLEAN },
    DOMICILIOCLI: { type: DataTypes.STRING },
    CEDULACLI: { type: DataTypes.STRING },

},
    {
        tableName: 'cliente',
        timestamps: false, // Desactivar la generación automática de timestamps
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
    });

export default ClienteModel;