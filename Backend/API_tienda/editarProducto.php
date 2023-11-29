<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objProducto = json_decode($json);

    if(isset($objProducto->id_producto))
    {
        $sql = "UPDATE productos SET nombre='$objProducto->nombre', descripcion='$objProducto->descripcion', precio='$objProducto->precio', stock='$objProducto->stock', imagen='$objProducto->imagen' WHERE id_producto='$objProducto->id_producto'";
        $query = $mysqli->query($sql);

        $jsonRespuesta = array('msg' => 'OK');
        echo json_encode($jsonRespuesta);
    }
    else
    {
        $jsonRespuesta = array('msg' => 'No se proporcionó id_cliente');
        echo json_encode($jsonRespuesta);
    }
?>