//inportamos el modelo
import AdminModel from "../models/AdminModel.js";

//** Metodos para el CRUD  **/

//Mostar todos los registros
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.findAll();
        res.json(admins);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Mostrar un registro
export const getAdmin = async (req, res) => {
    try {
        const admin = await AdminModel.findAll({
            where: {
                IDADMINISTRADOR: req.params.IDADMINISTRADOR
            }
        })
        res.json(admin[0])
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Crear un registro
export const createAdmin = async (req, res) => {
    try {
        await AdminModel.create(req.body)
        res.json({
            "message": "!Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Actualizar un registro
export const updateAdmin = async (req, res) => {
    try {
        await AdminModel.update(req.body, {
            where: {
                IDADMINISTRADOR: req.params.IDADMINISTRADOR
            }
        })
        res.json({
            "message": "!Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Eliminar un registro
export const deleteAdmin = async (req, res) => {
    try {
        await AdminModel.destroy({
            where: {
                IDADMINISTRADOR: req.params.IDADMINISTRADOR
            }
        })
        res.json({
            "message": "!Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
};