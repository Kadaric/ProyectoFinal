<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objPedido = json_decode($json);
    if(isset($objPedido->id_cliente))
    {
        $sql = "INSERT INTO pedidos(id_cliente,total) VALUES('$objPedido->id_cliente', '$objPedido->total')";
        
        $query = $mysqli->query($sql);

        if ($query) 
        {
            $idPedidoInsertado = $mysqli->insert_id;
    
            $jsonRespuesta = array('msg' => 'OK', 'id_pedido' => $idPedidoInsertado);
            echo json_encode($jsonRespuesta);
        }       
    }
    else
    {
        $jsonRespuesta = array('msg' => 'Error: cliente no existe');
        echo json_encode($jsonRespuesta);
    }