import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormCliente from "../FormCliente";

const URI = 'http://localhost:8000/cliente/';

const CompEditCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [cedula, setCedula] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI + id, {
            NOMBREU: nombre,
            APELLIDOU: apellido, FECHANACIMIENTOU: fechaNacimiento,
            CELULARU: celular, EMAILU: email, PASSWORDU: password,
            DOMICILIOCLI: domicilio, CEDULACLI: cedula
        });
        navigate('/gestionClientes');
    }

    useEffect(() => {
        getClienteById();
    }, []);

    const getClienteById = async () => {
        const res = await axios.get(URI + id)
        setNombre(res.data.NOMBREU);
        setApellido(res.data.APELLIDOU);
        setFechaNacimiento(res.data.FECHANACIMIENTOU);
        setCelular(res.data.CELULARU);
        setEmail(res.data.EMAILU);
        setPassword(res.data.PASSWORDU);
        setDomicilio(res.data.DOMICILIOCLI);
        setCedula(res.data.CEDULACLI);
    }

    return <FormCliente
        tituloFormCli="Editar Cliente"
        buttonNameFormCli="Editar"
        metodoOnSubmitFormCli={update}
        nombreCli={[nombre, setNombre]}
        apellidoCli={[apellido, setApellido]}
        fechaNacimientoCli={[fechaNacimiento, setFechaNacimiento]}
        celularCli={[celular, setCelular]}
        domicilioCli={[domicilio, setDomicilio]}
        cedulaCli={[cedula, setCedula]}
        emailCli={[email, setEmail]}
        passwordCli={[password, setPassword]}
    />



}

export default CompEditCliente;