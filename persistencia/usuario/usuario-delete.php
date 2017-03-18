<?php
session_start();
include '../ConnectionFactory.php';


$id = $_GET["user"];

$sql = "DELETE FROM usuario WHERE idUsuario='" . $id . "'";

$conexion = getConnection();

if ($conexion->query($sql)) {
    $datos = array("response" => "Consulta realizada con éxito");
} else {
    $datos = array("response" => "Error en la consulta");
}

closeConnection($conexion);


header('Content-type: application/json');
echo json_encode($datos);

?>
