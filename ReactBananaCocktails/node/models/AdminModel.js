//importamos la conexion a la base de datos
import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize';

const AdminModel = db.define('administrador', {
    IDADMINISTRADOR: {
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
},
    {
        tableName: 'administrador',
        timestamps: false, // Desactivar la generación automática de timestamps
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
    });

export default AdminModel;