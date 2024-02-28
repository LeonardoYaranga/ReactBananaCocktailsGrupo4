import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCliente from '../FormCliente';

const URI = 'http://localhost:8000/cliente/';

const CreateCliente = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [esAdmin, setEsAdmin] = useState(false); //por defecto el usuario no es admin
    const [domicilio, setDomicilio] = useState('');
    const [cedula, setCedula] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault(); //para evitar el submit por defecto del form
        await axios.post(URI, { NOMBREU: nombre, APELLIDOU: apellido, FECHANACIMIENTOU: fechaNacimiento, CELULARU: celular, EMAILU: email, PASSWORDU: password, ESADMIN: esAdmin, DOMICILIOCLI: domicilio, CEDULACLI: cedula });
        navigate('/gestionClientes');
    }

    return <FormCliente
        tituloFormCli="Crear Cliente"
        buttonNameFormCli="Crear"
        metodoOnSubmitFormCli={store}
        nombreCli={[nombre, setNombre]}
        apellidoCli={[apellido, setApellido]}
        fechaNacimientoCli={[fechaNacimiento, setFechaNacimiento]}
        celularCli={[celular, setCelular]}
        domicilioCli={[domicilio, setDomicilio]}
        cedulaCli={[cedula, setCedula]}
        emailCli={[email, setEmail]}
        passwordCli={[password, setPassword]}
        esAdminCli={[esAdmin, setEsAdmin]}
    />


}

export default CreateCliente
