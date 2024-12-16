<?php
session_start();

include_once('conexao.php');

if ((!isset($_SESSION['email']) == true) and (!isset($_SESSION['senha']) == true)) {
    unset($_POST['email']);
    unset($_POST['senha']);
    header("Location: login.html");
    exit();
}

$logado = $_SESSION['email'];

$sql = "SELECT * FROM cliente ORDER BY id DESC";
$stmt = $mysqli->query($sql);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Usuário</title>
    <link rel="icon" type="image/jpeg" href="Assets/Imagens/Amada.jpeg">
    <link href="Assets/CSS/designer.css" rel="stylesheet">
    <link href="Assets/CSS/fonts.css" rel="stylesheet">
    <link href="Assets/CSS/media.css" rel="stylesheet">
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
            <a href="contato.php">
                <li>Contato</li>
            </a>
            <a href="loja.html">
                <li>Loja</li>
            </a>
            <a href="inicial.html" id="inscreva-se-btn">
                <li>Tela Inicial</li>
            </a>
        </ul>
    </header>
    <h1>Perfil do Usuário</h1>

    <!-- Exibe os dados do usuário -->
    <?php
while ($cliente = mysqli_fetch_assoc($stmt)) {
    
    echo "<fieldset>";

    echo "<legend>Dados Pessoais</legend>";

    echo "<label for='nome'>Nome:</label><br>";
    echo "<input type='text' id='nome' value='" . htmlspecialchars($cliente['nome']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='email'>Email:</label><br>";
    echo "<input type='text' id='email' value='" . htmlspecialchars($cliente['email']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='senha'>Senha:</label><br>";
    echo "<input type='text' id='senha' value='" . htmlspecialchars($cliente['senha']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='data-nascimento'>Data de Nascimento:</label><br>";
    echo "<input type='date' id='data-nascimento' value='" . htmlspecialchars($cliente['data_nascimento']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "</fieldset><br>";


    echo "<fieldset>";

    echo "<legend>Endereço do Cliente</legend>";

    echo "<label for='cep'>CEP:</label><br>";
    echo "<input type='text' id='cep' value='" . htmlspecialchars($cliente['cep']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='rua'>Rua:</label><br>";
    echo "<input type='text' id='rua' value='" . htmlspecialchars($cliente['rua']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='bairro'>Bairro:</label><br>";
    echo "<input type='text' id='bairro' value='" . htmlspecialchars($cliente['bairro']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='cidade'>Cidade:</label><br>";
    echo "<input type='text' id='cidade' value='" . htmlspecialchars($cliente['cidade']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='estado'>Estado:</label><br>";
    echo "<input type='text' id='estado' value='" . htmlspecialchars($cliente['estado']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "<label for='pais'>País:</label><br>";
    echo "<input type='text' id='pais' value='" . htmlspecialchars($cliente['pais']) . "' style='width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;' readonly><br><br>";

    echo "</div>";

    echo "</fieldset>";
    
}
?>

    <form action="sair.php" method="post">
        <button id="inscreva-se-btn" id="logout" type="click">Sair</button>
    </form>

    <div id="mensagem"></div>

    <script src="Assets/JS/perfil.js"></script>
</body>
</html>