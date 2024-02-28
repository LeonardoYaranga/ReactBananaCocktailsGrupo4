import express from 'express';
import { createCliente, getAllClientes, getCliente, updateCliente, deleteCliente } from '../controllers/ClienteController.js';
import { createAdmin, getAllAdmins, getAdmin, updateAdmin, deleteAdmin } from '../controllers/AdminController.js';

const router = express.Router()

//Para CLIENTE
router.get('/cliente', getAllClientes)
router.get('/cliente/:IDCLIENTE', getCliente)
router.post('/cliente', createCliente)
router.put('/cliente/:IDCLIENTE', updateCliente)
router.delete('/cliente/:IDCLIENTE', deleteCliente)

//PARA ADMIN
 router.get('/administrador', getAllAdmins)
router.get('/administrador/:IDADMINISTRADOR', getAdmin)
router.post('/administrador/', createAdmin)
router.put('/administrador/:IDADMINISTRADOR', updateAdmin)
router.delete('/administrador/:IDADMINISTRADOR', deleteAdmin) 

export default router;