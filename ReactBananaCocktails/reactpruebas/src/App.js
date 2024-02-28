//import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./components/InicioL";
import Tienda from "./components/Tienda";
import Login from "./components/Login";
import Factura from "./components/Factura";

import AdminHome from './screens/AdminHome';

function App() {
  /* const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); */
/*   const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
 */  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    sessionStorage.getItem('isAdminLoggedIn') === 'true'
  );

  /* useEffect(() => {
    // Puedes realizar acciones adicionales cuando isAdminLoggedIn cambie
    console.log('isAdminLoggedIn cambió:', isAdminLoggedIn);
  }, [isAdminLoggedIn]); */

  return (

    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/tienda/:id" element={<Tienda />} />
          <Route path="/factura" element={<Factura />} />
          <Route
            path="/login"
            /*             element={<Login loggedIn={[isLoggedIn, setLoggedIn]} isAdmin={[isAdmin, setIsAdmin]} />}
             */
            element={<Login />}
          />


          {/* Solo para Administrador */}
          <Route
            path="/adminHome/*"
            element={(
              isAdminLoggedIn ? <AdminHome /> : <Navigate to="/login" />
            )}
          />


        </Routes>
      </Router>

    </div>
  );
}



export default App;
