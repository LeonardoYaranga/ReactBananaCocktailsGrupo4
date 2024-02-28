<!DOCTYPE html>

<html>

<head>


  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="../styles/loginStyle.css">
  <title>Login</title>
  <script src="../scripts/validacion.js" async></script>
</head>

<body>

  <section>
    <article class="contenedor">
      <article class="formulario">

        <form method="post">
          <?php
          include('controlador.php');
          ?>

          <center>

            <img class="logoAnimado" src="../Images/Iconos/Logotipo.png" alt="Logotipo"
              style="width:35%; background-color: #ffff; border-radius: 80px;">
          </center>

          <h2>Inicio de sesión</h2>

          <article class="inputContenedor">
            <i class="fas fa-envelope"></i>
            <input type="email" name="email" id="email" maxlength="100" oninput="validarCampo(this)" required>
            <label for="usuario">Email</label>
          </article>
          <article class="inputContenedor">
            <i class="fas fa-lock"></i>
            <input type="password" name="password" id="password" required>
            <label for="password">Contraseña</label>
          </article>

          <article class="olvidar">
            <label>
              <input type="checkbox" name="recordar" id="recordar">
              <span class="recordar">Recordarme</span>

              <a href="#">Olvide mi contraseña </a>
            </label>
          </article>

          <div class="sectionAccess">
            <input name="loginButton" id="loginButton" type="submit" value="Acceder">
            <article class="registrar">
              <p>¿No tienes cuenta?
                <a href="./register.php">Registrate</a>
              </p>
            </article>
          </div>

        </form>

      </article>

    </article>
  </section>

</body>

</html>