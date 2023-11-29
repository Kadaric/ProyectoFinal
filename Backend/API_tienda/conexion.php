<?php
    $mysqli = new mysqli("localhost","root","","tienda");
    
    if($mysqli->connect_errno) 
    {
        printf("Error conectando base de datos");
        exit();
    } 
?>