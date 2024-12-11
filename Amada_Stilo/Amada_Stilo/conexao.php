<?php

$hostname = "localhost:3307";
$bancodedados = "amada_stilo";
$usuario = "root";
$senha = "";

$mysqli = new mysqli($hostname, $usuario, $senha, $bancodedados);
if($mysqli -> connect_errno){
    echo "Falha ao conectar: (" . $mysqli -> connect_errno . ") " . $mysqli -> connect_errno;
    exit();
}


