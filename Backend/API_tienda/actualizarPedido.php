<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objPedido = json_decode($json);

    if(isset($objPedido->id_pedido))
    {
        $sql = "UPDATE pedidos SET id_cliente='$objPedido->id_cliente', total='$objPedido->total', estado='$objPedido->estado' WHERE id_pedido='$objPedido->id_pedido'";
        $query = $mysqli->query($sql);

        $jsonRespuesta = array('msg' => 'OK');
        echo json_encode($jsonRespuesta);
    }
    else
    {
        $jsonRespuesta = array('msg' => 'No se proporcionó id_pedido');
        echo json_encode($jsonRespuesta);
    }
?>