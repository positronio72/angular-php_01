<?php
session_start();
include '../ConnectionFactory.php';


$id = $_GET["user"];

$sql = "SELECT * FROM usuario WHERE idUsuario='" . $id . "'";

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
