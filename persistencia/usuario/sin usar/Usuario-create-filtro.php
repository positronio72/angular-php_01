<?php

session_start();

$_SESSION['campoFiltro'] = $_POST['campoFiltro'];
$_SESSION['valorFiltro'] = $_POST['valorFiltro'];


header('Content-type: application/json');
echo json_encode(["result" => "200", "post" => $_POST]);
    

?>
