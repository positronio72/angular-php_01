<?php
session_start();
include '../ConnectionFactory.php';

// /////////////////////////////////////////////////////////////////////////////////////////
// IMPORTANTE:
// /////////////////////////////////////////////////////////////////////////////////////////
// Si intento recoger los datos del POST como normalmente, devuelve un array vacío
// Hay que recoger los datos para la consulta de la forma que sigue:

// Accedo al RAW de datos (datos enviados por POST) directamente,
// no a una variable con un nombre y un valor
$datosRecibidos = file_get_contents("php://input");

// Decodifico los datos JSON para tratarlos como un Array
$json = json_decode($datosRecibidos, true);

$rol = $json['rolUsuario'];
$nombre = $json['nombreUsuario'];
$ape1 = $json['apellido1Usuario'];
$ape2 = $json['apellido2Usuario'];
$nif = $json['dniUsuario'];
$tf = $json['telefonoUsuario'];
$correo = $json['emailUsuario'];
$login = $json['loginUsuario'];
$password = $json['passwordUsuario'];

// /////////////////////////////////////////////////////////////////////////////////////////

// $rol = $_POST['rolUsuario'];
// $nombre = $_POST['nombreUsuario'];
// $ape1 = $_POST['apellido1Usuario'];
// $ape2 = $_POST['apellido2Usuario'];
// $nif = $_POST['dniUsuario'];
// $tf = $_POST['telefonoUsuario'];
// $correo = $_POST['emailUsuario'];
// $login = $_POST['loginUsuario'];
// $password = $_POST['passwordUsuario'];


$sql = "INSERT INTO usuario (idUsuario, rolUsuario, nombreUsuario, apellido1Usuario, apellido2Usuario," 
            . " dniUsuario, telefonoUsuario, emailUsuario, loginUsuario, passwordUsuario)"
            . " VALUES(null, '" . $rol . "', '" . $nombre . "', '" . $ape1 . "', '" . $ape2 . "', '" . $nif . "', '" . $tf . "', '" . $correo . "', '" . $login . "', '" . $password . "')";

$conexion = getConnection();

if ($conexion->query($sql)) {

    $sql = "SELECT * FROM usuario WHERE loginUsuario='" . $login . "'";

    if ($result = $conexion->query($sql)) {
        $datos[] = $result->fetch_assoc();
    } else {
        $datos = array("error" => "Error en la consulta de retorno");
    }
} else {
    $datos = array("error" => "Error en la consulta de inserción");
}

closeConnection($conexion);



header('Content-type: application/json');
echo json_encode($datos);

?>
