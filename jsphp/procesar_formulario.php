<?php
// Configuración de conexión a la base de datos
$host = 'localhost'; // Cambiar si el servidor es distinto
$dbname = 'hotelsled'; // Reemplaza con tu base de datos
$username = 'root'; // Cambia si usas otro usuario
$password = 'patata12'; // Cambia si tienes una contraseña

try {
    // Conectar a la base de datos con PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener datos del formulario
    $name = $_POST['name'];
    $apellido1 = $_POST['apellido1'];
    $apellido2 = $_POST['apellido2'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $fechaNacimiento = $_POST['fechaNacimiento']; // Fecha de nacimiento
    $entrada = $_POST['entrada'];
    $salida = $_POST['salida'];
    $huespedes = $_POST['huespedes'];
    $category = $_POST['category']; // Asumimos que esto es el tipo de habitación
    $services = $_POST['services']; // Servicios adicionales

    // Insertar en la tabla huesped

    // Preparar la consulta SQL para insertar datos en la tabla huesped
    $sqlHuesped = "INSERT INTO huesped (correo, fechaNacimiento, telefono) 
    VALUES (:correo, :fechaNacimiento, :telefono)";
    $stmtHuesped = $conn->prepare($sqlHuesped);

// Vincular los parámetros con las variables
    $stmtHuesped->bindParam(':correo', $correo);
    $stmtHuesped->bindParam(':fechaNacimiento', $fechaNacimiento);
    $stmtHuesped->bindParam(':telefono', $telefono, PDO::PARAM_INT);  // Asegúrate de que es un valor entero

// Ejecutar la consulta
    $stmtHuesped->execute();

// Obtener el ID del último registro insertado
    $huespedId = $conn->lastInsertId();  // Obtiene el ID del huésped insertado


    // Insertar en la tabla reservaciones
    $sqlReservacion = "INSERT INTO reservacion (idHuesped, fechaEntrada, fechaSalida, numHuespedes, categoria, servicios) 
                       VALUES (:idHuesped, :entrada, :salida, :huespedes, :category, :services)";
    $stmtReservacion = $conn->prepare($sqlReservacion);
    $stmtReservacion->bindParam(':idHuesped', $huespedId);
    $stmtReservacion->bindParam(':entrada', $entrada);
    $stmtReservacion->bindParam(':salida', $salida);
    $stmtReservacion->bindParam(':huespedes', $huespedes);
    $stmtReservacion->bindParam(':category', $category);
    $stmtReservacion->bindParam(':services', $services);
    $stmtReservacion->execute();
    $reservacionId = $conn->lastInsertId(); // Obtiene el ID de la reservación insertada

    // Relacionar la reservación con el huésped en la tabla aparta
    $sqlAparta = "INSERT INTO aparta (codigoReservacion, idHuesped) 
                  VALUES (:codigoReservacion, :idHuesped)";
    $stmtAparta = $conn->prepare($sqlAparta);
    $stmtAparta->bindParam(':codigoReservacion', $reservacionId);
    $stmtAparta->bindParam(':idHuesped', $huespedId);
    $stmtAparta->execute();

    echo "Datos guardados exitosamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
