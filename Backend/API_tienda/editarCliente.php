<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    $objCliente = json_decode($json);

    if(isset($objCliente->id_cliente))
    {
        $sql = "UPDATE clientes SET nombre='$objCliente->nombre', correo='$objCliente->correo', direccion='$objCliente->direccion' WHERE id_cliente='$objCliente->id_cliente'";
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