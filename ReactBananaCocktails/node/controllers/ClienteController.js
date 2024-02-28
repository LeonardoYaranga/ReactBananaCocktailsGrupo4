//inportamos el modelo
import ClienteModel from "../models/ClienteModel.js";

//** Metodos para el CRUD  **/

//Mostar todos los registros
export const getAllClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll();
        res.json(clientes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Mostrar un registro
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findAll({
            where: {
                IDCLIENTE: req.params.IDCLIENTE
            }
        })
        res.json(cliente[0])
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Crear un registro
export const createCliente = async (req, res) => {
    try {
        await ClienteModel.create(req.body)
        res.json({
            "message": "!Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Actualizar un registro
export const updateCliente = async (req, res) => {
    try {
        await ClienteModel.update(req.body, {
            where: {
                IDCLIENTE: req.params.IDCLIENTE
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
export const deleteCliente = async (req, res) => {
    try {
        await ClienteModel.destroy({
            where: {
                IDCLIENTE: req.params.IDCLIENTE
            }
        })
        res.json({
            "message": "!Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
};