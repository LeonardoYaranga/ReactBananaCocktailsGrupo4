<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Factura</title>
    <link rel="stylesheet" type="text/css" href="../styles/recuperarFactStyle.css">
</head>

<body>

    <section class="container">
        <h2>Factura</h2>
        <table>
            <tr>
                <th>Nombre</th>
                <td>
                    <?php echo $_POST["nombre"]; ?>
                </td>
            </tr>
            <tr>
                <th>Apellido</th>
                <td>
                    <?php echo $_POST["apellido"]; ?>
                </td>
            </tr>
            <tr>
                <th>Cedula</th>
                <td>
                    <?php echo $_POST["cedula"]; ?>
                </td>
            </tr>
            <tr>
                <th>Email</th>
                <td>
                    <?php echo $_POST["email"]; ?>
                </td>
            </tr>
            <tr>
                <th>Fecha</th>
                <td>
                    <?php echo $_POST["fecha"]; ?>
                </td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>
                    <?php echo $_POST["direccion"]; ?>
                </td>
            </tr>
        </table>

        <h3>Productos</h3>
        <table border=2>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total Individual</th>
            </tr>
            <?php
            // Inicializar el total
            $totalGeneral = 0;

            // Mostrar productos seleccionados
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['productos'], $_POST['precios'], $_POST['cantidades'])) {
                foreach ($_POST['productos'] as $index => $producto) {
                    echo "<tr>";
                    echo "<td>{$producto}</td>";
                    echo "<td>{$_POST['cantidades'][$index]}</td>";
                    echo "<td>{$_POST['precios'][$index]}</td>";

                    // Calcular el total individual
                    $totalIndividual = floatval($_POST['cantidades'][$index]) * floatval($_POST['precios'][$index]);
                    echo "<td>{$totalIndividual} $</td>";

                    // Sumar al total general
                    $totalGeneral += $totalIndividual;

                    echo "</tr>";
                }
            }

            // Mostrar la fila del total después del bucle
            echo "<tr>";
            $color = 'lightgray';
            echo "<td colspan='3' style='background-color: $color; text-align: right;'>Total General</td>";
            echo "<td style='background-color: $color;'>{$totalGeneral} $</td>";
            echo "</tr>";
            ?>
        </table>
    </section>

</body>

</html>
