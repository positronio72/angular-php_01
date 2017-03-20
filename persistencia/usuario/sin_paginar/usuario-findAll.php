<?php

session_start();
include '../ConnectionFactory.php';


$sql = "SELECT * FROM usuario";

if ($conexion = getConnection()) {
    if ($result = $conexion->query($sql)) {
        while($row = $result->fetch_assoc()){
            $respuesta[] = $row;
        }
    } else {
        $respuesta = array("error" => "Error en la consulta");
    }
} else {
    $respuesta = array("error" => "No se pudo conectar con el servidor de la base de datos");
}
closeConnection($conexion);


header('Content-type: application/json');
echo json_encode($respuesta);

?>

