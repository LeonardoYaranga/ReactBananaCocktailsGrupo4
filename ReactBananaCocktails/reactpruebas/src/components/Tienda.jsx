
import React, { useEffect, useState } from 'react';
import "../styles/indexStyle.css";
import "../styles/paraCarrito.css";
import { Link } from 'react-router-dom';
import iniciarCarrito from '../scripts/carrito';

const Tienda = () => {
    console.log('Renderización del componente Tienda')
    // Obtener el nombre de usuario de la URL
    const params = new URLSearchParams(window.location.search);
    const nameUser = params.get('name');
    const [productos, setProductos] = useState([]);

    function closeAside() {
        var popup = document.getElementById("popup");
        var carritoImagen = document.getElementById("carritoImagen");
        popup.style.width = "0%";
        carritoImagen.style.display = "block";
    }

    function openAside() {
        var popup = document.getElementById("popup");
        var carritoImagen = document.getElementById("carritoImagen");
        popup.style.width = "30%";
        carritoImagen.style.display = "none";
    }

    function openLink(url) {
        window.open(url, '_blank');
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../Database/productos.json');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
          iniciarCarrito(); // Llama a la función de inicialización del carrito después de que se cargan los productos
      }, [productos]); // Se ejecutará cada vez que cambie la variable productos
   

    const renderProductos = () => {

        const catalogoContainer = [];
        let seccionActual = null;
        let seccionActualElement = null;
        let nuevosHijos = [];
        productos.forEach(producto => {
            const { nombre, descripcion, section, precio, imagen } = producto;
            if (seccionActual !== section) {
                if (seccionActualElement !== null) {
                    // Clonamos el elemento actual y le asignamos los nuevos hijos
                    const nuevaSeccion = React.cloneElement(seccionActualElement, null, [...nuevosHijos]);
                    catalogoContainer.push(nuevaSeccion);
                }
                const nuevoTitulo = (
                    <h2 key={`titulo-${section}`} id={section.toLowerCase()} className="contenedor-items h2-Tienda">
                        {section}
                    </h2>
                );
                catalogoContainer.push(nuevoTitulo);
                // Inicializamos los hijos de la sección actual como un array vacío
                nuevosHijos = [];
                seccionActualElement = (
                    <section key={`seccion-${section}`} className={`wrap ${section} section-Tienda`}>
                    </section>
                );

                seccionActual = section;
            }
            const nuevoProducto = (
                <article key={`producto-${nombre}`} className="tarjeta-Tienda tarjetaAnimada item">
                    <section className="face front section-Tienda">
                        <img src={`../Images/${section}/${imagen}`} alt={nombre} className="img-item img-Tienda" />
                        <section className="wrap-text_tarjeta section-Tienda">
                            <article className="precio_tarjeta">
                                <span className="precio-item">{`${precio}$`}</span>
                            </article>
                            <span className="titulo-item">{nombre}</span>
                        </section>
                    </section>
                    <section className="face back">
                        <section className="wrap-text_tarjeta section-Tienda">
                            <span className="titulo-item">{nombre}</span>
                            <p>{descripcion}</p>
                            <section className="cta-wrap_tarjeta section-Tienda">
                                <article className="precio_tarjeta">
                                    <span className="precio-item">{`${precio}$`}</span>
                                </article>
                                <article className="cta_tarjeta">
                                    <button className="boton-item" onClick={openAside}>
                                        Agregar al Carrito
                                    </button>
                                </article>
                            </section>
                        </section>
                    </section>
                </article>
            );
            nuevosHijos.push(nuevoProducto);
        }
        );

        if (seccionActualElement !== null) {
            const nuevaSeccion = React.cloneElement(seccionActualElement, null, [...nuevosHijos]);
            catalogoContainer.push(nuevaSeccion);
        }
        return catalogoContainer;
    };

    return (
        <div className="body-Tienda">
            <header className="header-Tienda">
                <table>
                    <tr>
                        <td style={{ width: '5%' }}>
                            <img
                                className="logoAnimado img-Tienda"
                                src="../Images/Iconos/Logotipo.png"
                                alt="Logotipo"
                                style={{ width: '250%', backgroundColor: '#ffff', borderRadius: '80px' }}
                            />
                        </td>
                        <td style={{ width: '29%' }}>
                            <Link to="/inicio" className="text">Inicio</Link>
                        </td>
                        <td style={{ textAlign: 'center', width: '30%' }}>
                            <h1>Banana's Cocktails</h1>
                            <p>
                                <em>¡Cócteles exclusivos a un clic de distancia!</em>
                            </p>
                        </td>
                        <td style={{ width: '20%' }}>
                            {/*{nameUser ? (
                <h3 className="helloUser h3-Tienda">Hola {nameUser}</h3>
              ) : (
                <a href="./Formularios/login.php" className="text">
                  Iniciar sesión
                </a>
              )}*/}
                            <Link to="/login" className="text">Iniciar sesión</Link>
                        </td>
                        <td id="carritoContainer" style={{ width: '6%' }}>
                            <img
                                className="carritoAnimado img-Tienda"
                                src="../Images/Iconos/CarritoCompra.png"
                                alt="Imagen de Carrito de Compras"
                                style={{ width: '120%' }}
                                id="carritoImagen"
                                onClick={openAside}
                            />
                        </td>
                    </tr>
                </table>
            </header>

            <nav className="navul">
                <ul>
                    <strong>
                        <li className="navli"><a href="#whisky" className="nava">Whisky</a></li>
                        <li className="navli"><a href="#ron" className="nava">Ron</a></li>
                        <li className="navli"><a href="#tequila" className="nava">Tequila</a></li>
                        <li className="navli"><a href="#vodka" className="nava">Vodka</a></li>
                        <li className="navli"><a href="#gin" className="nava">Gin</a></li>
                        <li className="navli"><a href="#vino" className="nava">Vino</a></li>
                    </strong>
                </ul>
            </nav>
            {/*<!-- Mostrar productos seleccionados --> */}
            <aside id="popup" className="aside-Tienda">
                <button className="closebtn" onClick={closeAside}>Cerrar</button>
                <div className="aside-Tienda_content">
                    {/* <!-- Carrito de Compras --> */}
                    <div className="carrito" id="carrito">
                        <div className="header-carrito">
                            <h3 className='h3-Tienda'>Tu Carrito</h3>
                        </div>
                        <div className="carrito-items">
                            {/*  <!--Aquí se mostrarán los productos seleccionados--> */}
                        </div>
                        <div className="carrito-total">
                            <div className="fila">
                                <strong>Tu Total</strong>
                                <span className="carrito-precio-total">
                                    $120.000,00
                                </span>
                            </div>
                            <button className="btn-pagar">Pagar <i className="fa-solid fa-bag-shopping"></i> </button>
                        </div>
                    </div>
                </div>


            </aside>

            <section className="catalogo section-Tienda" id="catalogo-container">
                {renderProductos()}


            </section>

            <footer className="footer-Tienda">
                <img
                    src="../Images/Iconos/instagram.png"
                    alt="Instagram"
                    onClick={() => openLink('https://www.instagram.com/')}
                />
                <img
                    src="../Images/Iconos/facebook.png"
                    alt="Facebook"
                    onClick={() => openLink('https://www.facebook.com/')}
                />
                <img
                    src="../Images/Iconos/tiktok.png"
                    alt="TikTok"
                    onClick={() => openLink('https://www.tiktok.com/')}
                />
                <p>&copy;2023 Banana's Cocktails</p>
            </footer>
        </div>
    );



};

export default Tienda;
