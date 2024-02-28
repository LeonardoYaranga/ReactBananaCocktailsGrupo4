import React from 'react'
import { validarSoloLetras, validarCampo, validarSoloNumeros, validarCedulaInput } from '../scripts/validacion';
import '../styles/registerStyle.css';

const FormCliente = (props) => {

    return (
        <div className="body-Register">
            <section className='section-Register'>
                <article className="contenedor-Register">
                    <center>
                        <img
                            className="logoAnimado"
                            src="../Images/Iconos/Logotipo.png"
                            alt="Logotipo"
                            style={{ width: '35%', backgroundColor: '#ffff', borderRadius: '80px' }}
                        />
                    </center>
                    <article className="formulario">
                        <h2>{props.tituloFormCli}</h2>
                        <form onSubmit={props.metodoOnSubmitFormCli}>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-user"></i>
                                <input
                                    value={props.nombreCli[0]}
                                    type="text"
                                    name="nombre"
                                    id="registerName"
                                    pattern="[A-Za-z]+"
                                    maxLength="100"
                                    onKeyPress={(event) => validarSoloLetras(event)}
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.nombreCli[1](e.target.value)}
                                    required
                                />
                                <label htmlFor="nombreRegister" className='form-label'>Nombre</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-user"></i>
                                <input
                                    value={props.apellidoCli[0]}
                                    type="text"
                                    name="apellido"
                                    id="registerSurname"
                                    pattern="[A-Za-z]+"
                                    maxLength="100"
                                    onKeyPress={(event) => validarSoloLetras(event)}
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.apellidoCli[1](e.target.value)}
                                    required
                                />
                                <label htmlFor="apellido">Apellido</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-calendar-alt"></i>
                                <input
                                    value={props.fechaNacimientoCli[0]}
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    onChange={(e) => props.fechaNacimientoCli[1](e.target.value)}
                                    required />
                                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-phone"></i>
                                <input
                                    value={props.celularCli[0]}
                                    name="celular"
                                    id="celular"
                                    pattern="[0-9]+"
                                    maxLength="10"
                                    onKeyPress={(event) => validarSoloNumeros(event)}
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.celularCli[1](e.target.value)}
                                    required
                                />
                                <label htmlFor="celular">Celular</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-home"></i>
                                <textarea
                                    value={props.domicilioCli[0]}
                                    cols="35" rows="9" id="direccion" name="domicilio" pattern="[A-Za-z0-9\s\-\.,]+"
                                    className='textArea-Register'
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.domicilioCli[1](e.target.value)}
                                    required ></textarea>

                                <label htmlFor="domicilio">Domicilio</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-id-card"></i>
                                <input
                                    value={props.cedulaCli[0]}
                                    id="cedula" name="cedula" minlength="10"
                                    pattern="[0-9]{10}"
                                    onkeypress={(e) => validarSoloNumeros(e.event)}
                                    oninput={(e) => validarCedulaInput(e.target)}
                                    onChange={(e) => props.cedulaCli[1](e.target.value)}
                                    required />
                                <p id="mensajeError" style={{ color: 'red' }}></p>

                                <label htmlFor="cedula">Cedula</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-envelope"></i>
                                <input
                                    value={props.emailCli[0]}
                                    type="email"
                                    name="email"
                                    id="emailRegister"
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.emailCli[1](e.target.value)}
                                    required
                                />
                                <label htmlFor="usuario">Email</label>
                            </article>
                            <article className="inputContenedor-Register">
                                <i className="fas fa-lock"></i>
                                <input
                                    value={props.passwordCli[0]}
                                    type="password" name="password" id="passwordRegister"
                                    onInput={(e) => validarCampo(e.target)}
                                    onChange={(e) => props.passwordCli[1](e.target.value)}
                                    required />
                                <label htmlFor="password">Contraseña</label>
                            </article>

                            <article className="registrar">
                                <input
                                    name="buttonRegister" id="botonEnviar" className='buttonRegister'
                                    type="submit" value={props.buttonNameFormCli} />
                            </article>
                        </form>
                    </article>
                </article>
            </section>
        </div>
    )
}

export default FormCliente
