<?php

session_start();
include '../ConnectionFactory.php';

    
    $page = $_GET['page'];
    $limit = $_GET['rows'];
    $sidx = $_GET['sidx'];
    $sord = $_GET['sord'];

    $campoFiltro = $_SESSION['campoFiltro'];
    $valorFiltro = $_SESSION['valorFiltro'];

    
    if (!$sidx){$sidx = 1;}
    
    $conexion = getConnection();
    $consultaCount = "SELECT COUNT(*) AS count FROM usuario";
    
    $result = $conexion->query($consultaCount);
    $row = $result->fetch_assoc();
    $count = $row['count'];
    
    if ($count > 0) {
        $total_pages = ceil($count / $limit);
    } else {
        $total_pages = 0;
    }
    if ($page > $total_pages)
        $page = $total_pages;
    $start = $limit * $page - $limit;

    $sqlFiltro = "SELECT * FROM usuario WHERE " . $campoFiltro . "='" . $valorFiltro . "' ORDER BY $sidx $sord LIMIT $start , $limit";
    $SQL = $sqlFiltro;

    $result = $conexion->query($SQL);
    
    $respuesta = new stdClass();
    $respuesta->page = $page;
    $respuesta->total = $total_pages;
    $respuesta->records = $count;
    $i = 0;
    
    while ($row = $result->fetch_assoc()) {
        $respuesta->rows[$i]['id'] = $row['idUsuario'];
        $respuesta->rows[$i]['cell'] = array($row['idUsuario'], $row['rolUsuario'], $row['nombreUsuario'], $row['apellido1Usuario'], $row['apellido2Usuario'],
            $row['dniUsuario'], $row['telefonoUsuario'], $row['emailUsuario'], $row['loginUsuario'], $row['passwordUsuario']);
        $i++;
    }

    
    closeConnection($conexion);
    echo json_encode($respuesta);

    $_SESSION['campoFiltro'] = "";
    $_SESSION['valorFiltro'] = "";
    

?>

