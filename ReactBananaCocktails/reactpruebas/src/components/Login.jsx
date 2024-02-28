import React, { useState, useEffect } from 'react';
import '../styles/loginStyle.css'; // Asegúrate de importar tu archivo de estilos
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';


const URIcliente = 'http://localhost:8000/cliente/';
const URIAdministrador = 'http://localhost:8000/administrador/';


const Login = (/* props */) => {


    /*     console.log(props.loggedIn[0], props.isAdmin[0]);
     */
    const [clientes, setCliente] = useState([]);
    const [admins, setAdmin] = useState([]);

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        sessionStorage.getItem('isAdminLoggedIn') === 'true'
    );
    useEffect(() => {
        // Puedes realizar acciones adicionales cuando isAdminLoggedIn cambie
        console.log('isAdminLoggedIn cambió:', isAdminLoggedIn);
    }, [isAdminLoggedIn]);

    useEffect(() => {
        getClientes();
        getAdmins();
    }, []);


    //procedimiento para mostrar todos los clientes
    const getClientes = async () => {
        const res = await axios.get(URIcliente);
        if (res && res.data) {
            setCliente(res.data);
        }
    }

    const getAdmins = async () => {
        const res = await axios.get(URIAdministrador);
        if (res && res.data) {
            setAdmin(res.data);
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        let loggedIn = false;

        for (let i = 0; i < admins.length; i++) {
            if (admins[i].EMAILU === email && admins[i].PASSWORDU === password && admins[i].ESADMINU === true) {
                console.log('Admin correcto');
                loggedIn = true;

                sessionStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/adminHome');
                break;
            }

            if (!loggedIn) {
                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].EMAILU === email && clientes[i].PASSWORDU === password) {
                        console.log('Cliente correcto');
                        //Redireccionar a la pagina de inicio del cliente
                        loggedIn = true;
                        navigate(`/tienda/${clientes[i].IDCLIENTE}`);
                        break;
                    }
                }
            }

        }
        if (!loggedIn) {
            alert('Usuario o contraseña incorrectos');
        }

    };

    return (
        <div className="body-Login">
            <section className="section-Login">
                <article className="contenedor-Login">
                    <article className="formulario-Login">
                        <form onSubmit={handleSubmit}>
                            <center>
                                <img
                                    className="logoAnimado"
                                    src="../Images/Iconos/Logotipo.png"
                                    alt="Logotipo"
                                    style={{ width: '35%', backgroundColor: '#ffff', borderRadius: '80px' }}
                                />
                            </center>

                            <h2>Inicio de sesión</h2>

                            <article className="inputContenedor">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    maxLength="100"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </article>
                            <article className="inputContenedor">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <label htmlFor="password">Contraseña</label>
                            </article>

                            <article className="olvidar">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="recordar"
                                        id="recordar"
                                        checked={remember}
                                        onChange={() => setRemember(!remember)}
                                    />
                                    <span className="recordar">Recordarme</span>

                                    <a href="#">Olvide mi contraseña</a>
                                </label>
                            </article>

                            <div className="sectionAccess-Login">
                                <input name="loginButton" id="loginButton" type="submit" value="Acceder" />
                                <article className="registrar-Login">
                                    <p>
                                        ¿No tienes cuenta? <Link to="/createCliente" className="linkRegistrate-Login">Registrate</Link>
                                    </p>
                                </article>
                            </div>
                        </form>
                    </article>
                </article>
            </section>
        </div>
    );
};

export default Login;
