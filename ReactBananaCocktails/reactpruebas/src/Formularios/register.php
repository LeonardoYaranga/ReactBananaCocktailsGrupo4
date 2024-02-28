<!DOCTYPE html>

<html>

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles/registerStyle.css">
  <meta charset="UTF-8">
  <title>Register</title>
  <script src="../scripts/validacion.js" async></script>

</head>

<body>

  <section>
    <article class="contenedor">
      <center> <img class="logoAnimado" src="../Images/Iconos/Logotipo.png" alt="Logotipo"
          style="width:35%; background-color: #ffff; border-radius: 80px;">
      </center>
      <article class="formulario">

        <form method="post">
          <h2>Registrate</h2>
          <article class="inputContenedor">
            <i class="fas fa-user"></i>
            <input type="text" name="name" id="registerName" pattern="[A-Za-z]+" maxlength="100"
              onkeypress="validarSoloLetras(event)" oninput="validarCampo(this)" required>
            <label for="nombreRegister">Nombre</label>
          </article>
          <article class="inputContenedor">
            <i class="fas fa-user"></i>
            <input type="text" name="surname" id="registerSurname" pattern="[A-Za-z]+" maxlength="100"
              onkeypress="validarSoloLetras(event)" oninput="validarCampo(this)" required>
            <label for="apellido">Apellido</label>
          </article>
          <article class="inputContenedor">
            <i class="fas fa-calendar-alt"></i>
            <input type="date" name="dateOfBirth" id="dateOfBirth" required>
            <label for="dateOfBirth">Fecha de nacimiento</label>
          </article>
          <article class="inputContenedor">
            <i class="fas fa-envelope"></i>
            <input type="email" name="email" id="emailRegister" oninput="validarCampo(this)" required>
            <label for="usuario">Email</label>
          </article>
          <article class="inputContenedor">
            <i class="fas fa-lock"></i>
            <input type="password" name="password" id="passwordRegister" required>
            <label for="password">Contraseña</label>
          </article>

          <article class="registrar">
            <input name="buttonRegister" id="buttonRegister" type="submit" value="Registrarse">
          </article>
      </article>

      </form>

    </article>
    </article>
  </section>


</body>

</html>


<?php
include('abrir_conexion.php');
$name = "";
$surname = "";
$dateOfBirth = "";
$email = "";
$password = "";

if (isset($_POST['buttonRegister'])) {
  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $dateOfBirth = $_POST['dateOfBirth'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  if ($name == "" || $surname == "" || $dateOfBirth == "" || $email == "" || $password == "") {

  } else {
    $query = "INSERT INTO user (nameU, surnameU, dateOfBirthU, emailU, passwordU) VALUES ('$name', '$surname', '$dateOfBirth', '$email', '$password')";
    $result = mysqli_query($conexion, $query);
    if ($result) {
      echo "<script>alert('Usuario registrado con éxito')</script>";
      header("Location: ./login.php");
    } else {
      echo "<script>alert('Error al registrar usuario')</script>";
    }
  }

}


?>