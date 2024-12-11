<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){

  include_once('conexao.php');

  $nome = $_POST['nome'] ?? '';
  $data_nasc = $_POST['data-nascimento'] ?? '';
  $email = $_POST['email'] ?? '';
  $senha = $_POST['senha'] ?? '';
  $telefone = $_POST['telefone'] ?? '';
  $confirma_senha = $_POST['confirma-senha'] ?? '';

  
  $sql = "INSERT INTO cliente (nome, email, senha, data_nascimento) 
          VALUES ('$nome','$email', '$senha', '$data_nasc')";
  

  if (mysqli_query($mysqli, $sql)) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Cadastro realizado com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao realizar cadastro: ' . mysqli_error($mysqli)]);
}
  
  exit();

}

