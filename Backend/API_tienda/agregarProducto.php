<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objProducto = json_decode($json);
    $sql = "INSERT INTO productos(nombre, descripcion, precio, stock, imagen) VALUES('$objProducto->nombre', '$objProducto->descripcion', '$objProducto->precio', '$objProducto->stock', '$objProducto->imagen')";
    
    $query = $mysqli->query($sql);

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
?>