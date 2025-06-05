<?php
header('Content-Type: application/json');

if (isset($_GET['idHuesped'])) {
    $idHuesped = $_GET['idHuesped'];

    // Conexión a la base de datos
    $conn = new mysqli('localhost', 'root', '', 'hotel');

    // Verificar conexión
    if ($conn->connect_error) {
        echo json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]);
        exit;
    }

    // Consultar los datos del huésped
    $stmt = $conn->prepare("SELECT nombre, apellido1, apellido2, telefono, correo, fecha_entrada AS entrada, fecha_salida AS salida, huespedes, habitacion, servicios FROM reservaciones WHERE id = ?");
    $stmt->bind_param("i", $idHuesped);
    $stmt->execute();
    $result = $stmt->get_result();

    // Si encuentra datos, los devuelve; si no, devuelve un JSON vacío
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode([
            "nombre" => "",
            "apellido1" => "",
            "apellido2" => "",
            "telefono" => "",
            "correo" => "",
            "entrada" => "",
            "salida" => "",
            "huespedes" => "",
            "habitacion" => "",
            "servicios" => ""
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'No se proporcionó el ID del huésped']);
}
?>
