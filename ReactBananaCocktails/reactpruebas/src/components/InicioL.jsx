import React, { useEffect } from 'react';
import "../styles/inicioL.css";
import { Link } from 'react-router-dom';

const Inicio = () => {

  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropdownMenu = document.querySelector('.dropdown_menu-Inicio');

    const handleToggleClick = () => {
      dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
      const isOpen = (dropdownMenu.style.display === 'block');
      toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    toggleBtn.addEventListener('click', handleToggleClick);

    // Limpieza del efecto
    return () => {
      toggleBtn.removeEventListener('click', handleToggleClick);
    };
  }, []); // El segundo argumento (un array vacío) asegura que el efecto se ejecute solo una vez al montar el componente.


  function redirigirATienda() {
    window.location.href = "/tienda";
  }

  return (
    <div className="body-Inicio">
      <div className="content-Inicio">

        <header className="header-Inicio">

          <div className="navbar-Inicio">
            <div className="logo"><a href="#">Banana's Cocktails</a></div>
            <ul className="links">
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#destacados">Promociones</a></li>
              <li><a href="#recuerdos">Fotos</a></li>
            </ul>
            <Link to="/tienda" className="action_btn">Ir a la tienda</Link>
            <div className="toggle_btn">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="dropdown_menu-Inicio">
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#destacados">Promociones</a></li>
            <li><a href="#recuerdos">Fotos</a></li>
            <Link to="/tienda" className="action_btn">Ir a la tienda</Link>
          </div>
        </header>

        <section className="generalSection-Inicio">

          <section id="nosotros" className="slider-box">
            <ul>
              <li>
                <img src="../Images/Whisky/whisky-sour.png" alt="" />
                <section className="slider-box_texto">
                  <h2>¿Quiénes Somos?</h2>
                  <p>Somos un emprendimiento que se ha destacado por su calidad de servicio, contamos con más de 6 años de experiencia.</p>
                </section>
              </li>
              <li>
                <img src="../Images/Ron/Cubalibre.png" alt="" />
                <section className="slider-box_texto">
                  <h2>¿Qué hacemos?</h2>
                  <p>Vendemos cócteles y agendamos eventos festivos.</p>
                </section>
              </li>
              <li>
                <img src="../Images/Ron/corazonada.png" alt="" />
                <section className="slider-box_texto">
                  <h2>¿Cómo trabajamos?</h2>
                  <p>Trabajamos bajo pedido, según la fecha de reservación, ahí estaremos.</p>
                </section>
              </li>
              <li>
                <img src="../Images/Tequila/tequilaSunrise.png" alt="" />
                <section className="slider-box_texto">
                  <h2>¿Qué hay de nuevo?</h2>
                  <p>Nuevos cócteles por descubrir.</p>
                </section>
              </li>
            </ul>
          </section>

          <h2 id="destacados">Productos destacados, ¡ahora con descuento!</h2>
          <section className="productosDestacados">
            <center>
              <div className="carruselRotatorio3D">
                <div className="carruselRotatorio3D_tarjeta" id="producto1" onClick={redirigirATienda}>
                  <h3>Padrino</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto2" onClick={redirigirATienda}>
                  <h3>Sex On The Beach</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto3" onClick={redirigirATienda}>
                  <h3>Sangria</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto4" onClick={redirigirATienda}>
                  <h3>Vodka Sunrise</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto5" onClick={redirigirATienda}>
                  <h3>Martini</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto6" onClick={redirigirATienda}>
                  <h3>Martini Frutilla</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto7" onClick={redirigirATienda}>
                  <h3>Daikiri Clasico</h3>
                </div>
                <div className="carruselRotatorio3D_tarjeta" id="producto8" onClick={redirigirATienda}>
                  <h3>Gimlet</h3>
                </div>
              </div>
            </center>
          </section>

          <h2 className="recuerdos" id="recuerdos">Recuerdos</h2>
          <section className="grid-container">
            <img src="../Images/Recuerdos/Evento1.png" />
            <img src="../Images/Recuerdos/Evento2.png" />
            <img src="../Images/Recuerdos/Evento3.png" />
            <img src="../Images/Recuerdos/Evento4.png" />
            <img src="../Images/Recuerdos/Evento5.png" />
            <img src="../Images/Recuerdos/Evento6.png" />
            <img src="../Images/Recuerdos/Evento7.png" />
            <img src="../Images/Recuerdos/Evento 8.png" />
            <img src="../Images/Recuerdos/Evento9.png" />
            <img src="../Images/Recuerdos/Evento10.png" />
          </section>

        </section>

        <footer className="footer-Inicio">
          <img src="../Images/Iconos/instagram.png" alt="Instagram" onClick={() => window.open('https://www.instagram.com/', '_blank')} />
          <img src="../Images/Iconos/facebook.png" alt="Facebook" onClick={() => window.open('https://www.facebook.com/', '_blank')} />
          <img src="../Images/Iconos/tiktok.png" alt="TikTok" onClick={() => window.open('https://www.tiktok.com/', '_blank')} />
          <p>&copy;2023 Banana's Cocktails</p>
        </footer>
      </div>
    </div>
  );

};

export default Inicio;