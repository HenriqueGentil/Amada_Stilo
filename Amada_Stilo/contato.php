<?php
session_start();

include_once('conexao.php');

// Verifica se o usuário está logado
if (!isset($_SESSION['email']) || !isset($_SESSION['senha'])) {
    unset($_SESSION['email']);
    unset($_SESSION['senha']);
    header("Location: login.html");
    exit();
}

// Recupera valores da sessão
$email_usuario = $_SESSION['email'];

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera valores do formulário
    $assunto = $_POST['assunto'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';

    // Insere os dados na tabela contato
    $sql_insert = "INSERT INTO contato (email_usuario, assunto, mensagem) VALUES (?, ?, ?, ?)";

    // Prepara a consulta para evitar SQL Injection
    $stmt = $mysqli->prepare($sql_insert);

    if ($stmt) {
        $stmt->bind_param("sss",$email_usuario, $assunto, $mensagem); // Liga as variáveis à consulta
        if ($stmt->execute()) {
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Mensagem enviada com sucesso.']);
        } else {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao enviar a mensagem.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro na preparação da consulta.']);
    }
}

// Consulta para recuperar dados da tabela cliente
$sql = "SELECT * FROM cliente ORDER BY id DESC";
$stmt = $mysqli->query($sql);

// Fecha a conexão com o banco de dados
$mysqli->close();
?>



<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amada 'Stilo</title>

  <link rel="icon" type="image/jpeg" href="Assets/Imagens/Amada.jpeg">
  <link href="Assets/CSS/designer.css" rel="stylesheet">
  <link href="Assets/CSS/fonts.css" rel="stylesheet">
  <link href="Assets/CSS/media.css" rel="stylesheet">
  <script src="Assets/JS/contato.js"></script>
</head>

<body>
  <header>
    <div id="title">
      <img src="Assets/Imagens/Amada.jpeg" alt="Amada">
      <div id="texttitle">
        <h1>Amada</h1>
        <h1>'Stilo</h1>
      </div>

    </div>
    <ul>
    <a href="inicial.html">
        <li>Inicio</li>
      </a>
      <a href="sobre.html">
        <li>Sobre</li>
      </a>
      <a href="">
        <li>Contato</li>
      </a>
      <a href="loja.html">
        <li>Loja</li>
      </a>

      <li><a id="btnPerfil" href="perfil.php"> Meu Perfil</a></li>
    </ul>
  </header>
  <div id="contato">
    <h1>Entre em Contato</h1>
    <p>Envie-nos suas dúvidas, sugestões ou pedidos. Estamos aqui para ajudar!</p>

    <?php

    while ($cliente = mysqli_fetch_assoc($stmt)) {
      echo "<label for='email'>Email:</label><br>";
      echo "<input type='text' id='email' value='" . htmlspecialchars($cliente['email']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";
    }
    ?>

    <?php

    echo '
<form id="formContato" method="post" action="contato.php">

    <label for="assunto">Assunto:</label><br>
    <input type="text" id="assunto" name="assunto"><br><br>

    <label for="mensagem">Mensagem:</label><br>
    <textarea id="mensagem" name="mensagem" rows="4"></textarea><br><br>

    <button type="submit">Enviar</button>
</form>
';

    ?>
  </div>
  
</body>

</html>