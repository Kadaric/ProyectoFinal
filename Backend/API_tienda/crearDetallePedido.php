<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objPedido = json_decode($json);

    $detalles = $objPedido->detalles;
  
    foreach ($detalles as $detalle) 
    {
        $sqlDetalle = "INSERT INTO detalle_pedido(id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES('$objPedido->id_pedido', '$detalle->id_producto', '$detalle->cantidad','$detalle->precio_unitario','$detalle->subtotal' )";
        $queryDetalle = $mysqli->query($sqlDetalle);
    
        if (!$queryDetalle) {
            $jsonRespuesta = array('msg' => 'Error al insertar detalle del pedido');
            echo json_encode($jsonRespuesta);
            exit;
        }
    }
    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
?>