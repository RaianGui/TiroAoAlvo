<?php
//Connection
$conn = new PDO("sqlite:Dimabank.sqlite");
$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$nome = $_POST["nome"];
$acertos = $_POST["acertos"];
$erros =  $_POST["erros"];
$data_hora = date("d-m-Y H:i:s");

$preparo = $conn->prepare(
    
    "INSERT INTO Resultados
    (nome, acertos, erros, tempo)
    VALUES(:n, :a, :e, :t);"
    );

$preparo->bindParam(":n", $nome);
$preparo->bindParam(":a", $acertos);
$preparo->bindParam(":e", $erros);
$preparo->bindParam(":t", $data_hora);

$preparo->execute();

?>