import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/cliente/';

const CompShowClientes = () => {
    const [clientes, setCliente] = useState([]);
    useEffect(() => {
        getClientes();
    }, []);


    //procedimiento para mostrar todos los clientes
    const getClientes = async () => {
        const res = await axios.get(URI);
        if (res && res.data) {
            setCliente(res.data);
        }
    }


    const deleteCliente = async (IDCLIENTE) => {
       await axios.delete(`${URI}${IDCLIENTE}`);
        getClientes();
    }


    return (
        <div className='container ShowClientes'>
            <div className='row '>
                <div className='col'>
                    <center><Link to="/createCliente" className='btn btn-primary mt-2 mb-2'>Nuevo Cliente <i className="fas fa-plus"></i></Link></center>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>IDCLIENTE</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de nacimiento</th>
                                <th>Celular</th>
                                <th>EMAIL</th>
                                <th>Domicilio</th>
                                <th>Cedula</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.IDCLIENTE}>
                                    <td>{cliente.IDCLIENTE}</td>
                                    <td>{cliente.NOMBREU}</td>
                                    <td>{cliente.APELLIDOU}</td>
                                    <td>{cliente.FECHANACIMIENTOU}</td>
                                    <td>{cliente.CELULARU}</td>
                                    <td>{cliente.EMAILU}</td>
                                    <td>{cliente.DOMICILIOCLI}</td>
                                    <td>{cliente.CEDULACLI}</td>
                                    <td>
                                        <center>
                                        <Link to={`/editCliente/${cliente.IDCLIENTE}`} className='btn btn-info'><i className='fas fa-edit' /></Link>
                                        <button onClick={() => deleteCliente(cliente.IDCLIENTE)} className='btn btn-danger'><i className='fas fa-trash-alt' /></button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default CompShowClientes;