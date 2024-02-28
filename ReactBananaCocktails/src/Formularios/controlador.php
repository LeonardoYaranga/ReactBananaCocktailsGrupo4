<style>
    .alertDanger {
        background-color: #f44336;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        display: inline-block;
    }

    .alertSuccess {
        background-color: #4CAF50;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
</style>

<?php

if (!empty($_POST["loginButton"])) {
    if (empty($_POST["email"]) || empty($_POST["password"])) {
        echo '<article class="alertDanger">Los campos son obligatorios</article>';
    } else {
        // Campos presentes, ahora verificar el usuario y la contraseña
        $email_ingresado = $_POST["email"];
        $contrasena_ingresada = $_POST["password"];
        $encontrado = false;

        include('abrir_conexion.php');
        $resultados = mysqli_query($conexion, "SELECT * FROM user");
        while ($consulta = mysqli_fetch_array($resultados)) {
            if ($email_ingresado == $consulta['emailU'] && $contrasena_ingresada == $consulta['passwordU']) {
                $encontrado = true;
                echo '<article class="alertSuccess">Inicio de sesión exitoso</article>';
                header("Location: ../index.php?name=" . $consulta['nameU']);
                exit();
            }        
        }
        if (!$encontrado) {
            echo '<article class="alertDanger">Usuario o contraseña incorrectos</article>';
        }


    }
}
?>