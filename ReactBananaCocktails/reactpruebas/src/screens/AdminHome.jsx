import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
/* import GestionClientes from "./GestionClientes";*/
import ShowClientes from '../components/cliente/ShowClientes';
import CreateCliente from "../components/cliente/CreateCliente";
import EditCliente from "../components/cliente/EditCliente";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminHome = () => {
    const navigate = useNavigate();

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        sessionStorage.getItem('isAdminLoggedIn') === 'true'
    );

    useEffect(() => {
        // Puedes realizar acciones adicionales cuando isAdminLoggedIn cambie
        console.log('isAdminLoggedIn cambió:', isAdminLoggedIn);
    }, [isAdminLoggedIn]);

    const adminLogout = () => {
        // Establecer el isAdminLoggedIn en false en sessionStorage
        sessionStorage.setItem('isAdminLoggedIn', 'false');

        // Actualizar el estado local
        setIsAdminLoggedIn(false);

        // Redirigir al login
        navigate('/login');
    };

    return (
        <div>
            <center>
                <h2>Bienvenido, Administrador</h2>
                {/* Links a las rutas específicas del administrador */}

                <nav className="nav nav-pills flex-column flex-sm-row navAdminHome">
                    <Link to="/adminHome/showClientes" className="flex-sm-fill text-sm-center nav-link text-bg-primary p-3" aria-current="page">
                        <i className='fas fa-edit' /> Gestionar clientes
                    </Link>

                    <Link to="/adminHome/showClientes" className='flex-sm-fill text-sm-center nav-link text-bg-success p-3'>
                        <i className='fas fa-edit' /> Gestionar Cocteles
                    </Link>
                    {/*  <Link to="/adminHome/gestion-cocteles" className='btn btn-info'>
                <i className='fas fa-edit' /> Gestionar cocteles
            </Link> */}
                    <Link to="/adminHome/showClientes" className='flex-sm-fill text-sm-center nav-link text-bg-info p-3'>
                        <i className='fas fa-edit' /> Gestionar Secciones
                    </Link>
                    <button onClick={adminLogout}
                        className='btn btn-warning flex-sm-fill text-sm-center '><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesion</button>

                </nav>

            </center>



            {/* Rutas específicas del administrador */}

            <Routes>
                <Route path="/showClientes" element={<ShowClientes />} />
                <Route path="/createCliente" element={<CreateCliente />} />
                <Route path="/editCliente/:id" element={<EditCliente />} />
                {/*             <Route path="/gestionCocteles" component={GestionCocteles} />*/}
            </Routes>

        </div>
    )
}

export default AdminHome
