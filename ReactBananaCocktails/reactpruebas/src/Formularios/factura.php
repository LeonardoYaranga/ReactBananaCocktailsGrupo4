<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <title>Facturación</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../styles/facturaStyle.css">
    <script src="../scripts/validacion.js" async></script>

</head>

<body>

    <header>
        <h1> Facturación </h1>
    </header>

    <section class="container">

        <p>Para realizar una compra, por favor llene el siguiente formulario con todos sus datos y nos contactaremos
            con usted.
        </p>

        <form action="../Formularios/recuperarFactura.php" method="post" target="_blank">

            <article class="inputBox">
                <label for="nombre">Nombre</label>
                <input id="nombre" name="nombre" onkeypress="validarSoloLetras(event)" oninput="validarCampo(this)"
                    placeholder="Ingresa tu nombre" required />
            </article>

            <article class="inputBox">
                <label for="apellido">Apellido</label>
                <input id="apellido" name="apellido" oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '');"
                    oninput="validarCampo(this)" placeholder="Ingresa tu apellido" pattern="[A-Za-z]+" required />
            </article>

            <article class="inputBox">
                <label for="cedula">Numero de cédula</label>
                <input id="cedula" name="cedula" placeholder="Ingresa tu número de cedula" minlength="10"
                    pattern="[0-9]{10}" onkeypress="validarSoloNumeros(event)" oninput="validarCedulaInput(this)"
                    required />
                <p id="mensajeError" style="color: red;"></p>
            </article>

            <article class="inputBox">
                <label for="celular">Celular</label>
                <input type="tel" name="celular" id="celular" placeholder="Ingresa tu número de celular" minlength="10"
                    pattern="[0-9]{10}" oninput="validarCampo(this)" onkeypress="validarSoloNumeros(event)" required />
            </article>

            <article class="inputBox">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" oninput="validarCampo(this)" placeholder="Ingresa tu email"
                    required />
            </article>

            <article class="inputBox">
                <label for="fecha">Fecha</label>
                <input type="date" name="fecha" id="fecha" min="<?php echo date('Y-m-d'); ?>" required />
            </article>

            <article class="inputBox">
                <center>
                    <label for="productos">Productos</label>
                    <table border=2 class="table-productos">
                        <tr>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Total Individual</th>
                        </tr>
                        <?php
                        $totalGeneral = 0; // Variable para almacenar el total general
                        
                        // Mostrar productos seleccionados
                        if (isset($_GET['productos']) && !empty($_GET['productos'])) {
                            $productos = json_decode($_GET['productos'], true);

                            foreach ($productos as $producto) {
                                echo "<tr>";
                                echo "<td>{$producto['nombre']}</td>";
                                echo "<td>{$producto['precio']}</td>";
                                echo "<td>{$producto['cantidad']}</td>";

                                // Calcular el total individual y actualizar el total general
                                $totalIndividual = floatval(str_replace('$', '', $producto['precio'])) * intval($producto['cantidad']);
                                $totalGeneral += $totalIndividual;

                                echo "<td>{$totalIndividual} $</td>";
                                // Campos ocultos para cada producto, precio y cantidad con input para que se recuperen los datos
                                echo "<input type='hidden' name='productos[]' value='{$producto['nombre']}'>";
                                echo "<input type='hidden' name='precios[]' value='{$producto['precio']}'>";
                                echo "<input type='hidden' name='cantidades[]' value='{$producto['cantidad']}'>";
                                echo "<input type='hidden' name='totales[]' value='{$totalIndividual}'>";
                                echo "</tr>";
                            }

                            // Mostrar la fila del total general
                            echo '<tr class="total-general">';
                            echo "<td colspan='3'><strong>Total General</strong></td>";
                            echo "<td><strong>{$totalGeneral} $</strong></td>";
                            echo "</tr>";

                        }
                        ?>
                    </table>
                </center>
            </article>


            <article class="inputBox">
                <label for="direccion"> Dirección </label>
                <br>
                <textarea cols="35" rows="7" id="direccion" name="direccion" pattern="[A-Za-z0-9\s\-\.,]+"></textarea>
            </article>


            <article class="button">
                <button id="botonEnviar" type="submit" value="compra"> Realizar Compra </button>
            </article>

        </form>

    </section>

    <footer>
        <img src="../Images/Iconos/instagram.png" alt="Instagram">
        <img src="../Images/Iconos/facebook.png" alt="Facebook">
        <img src="../Images/Iconos/tiktok.png" alt="TikTok">
        <p>&copy;2023 Banana's Cocktails</p>
    </footer>


</body>

</html>