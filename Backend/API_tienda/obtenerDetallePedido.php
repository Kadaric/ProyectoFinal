<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    
    
    $json = file_get_contents("php://input");
    $objDetallePedido = json_decode($json);
    if(isset($objDetallePedido->id_pedido))
    {

        $sql = "SELECT * FROM detalle_pedido WHERE id_pedido = $objDetallePedido->id_pedido";
        $query = $mysqli->query($sql);
        $datos = array();
        
        while($resultado = $query->fetch_assoc()) 
        {
            $datos[] = $resultado;
        }
        
        echo json_encode($datos);
    }
    else
    {
        $jsonRespuesta = array('msg' => 'Error: pedido no existe');
        echo json_encode($jsonRespuesta);
    }
?>