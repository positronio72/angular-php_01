<?php
session_start();
include '../ConnectionFactory.php';



$sql = "SELECT MAX(telefonoUsuario) AS telefonoUsuario FROM usuario";

$conexion = getConnection();

if ($result = $conexion->query($sql)) {
	$datos[] = $result->fetch_assoc();
} else {
    $datos = array("error" => "Error en la consulta de inserción");
}

closeConnection($conexion);



header('Content-type: application/json');
echo json_encode($datos);

?>
