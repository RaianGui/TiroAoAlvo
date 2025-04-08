<!DOCTYPE html>
<html>
<head>
  <title>Ranque de Tiro ao Alvo</title>
</head>
<body>
  <h1>Ranque de Tiro ao Alvo</h1>
  <table>
    <tr>
      <th>Nome</th>
      <th>Acertos</th>
      <th>Erros</th>
      <th>Data e Hora</th>
    </tr>
    <?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $acertos = $_POST['acertos'];
    $erros = $_POST['erros'];

    // Conecte ao banco de dados 
    $conn = new PDO("sqlite:Dimabank.sqlite");
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    if ($conexao->connect_error) {
        die('Erro na conexão com o banco de dados: ' . $conexao->connect_error);
    }

    // Resultados na tabela Salvarresultados
    $sql = "INSERT INTO Salvarresultados (nome, acertos, erros, data_hora) VALUES ('$nome', $acertos, $erros, NOW())";
    if ($conexao->query($sql) === TRUE) {
        echo 'Resultados salvos com sucesso.';
    } else {
        echo 'Erro ao salvar resultados: ' . $conexao->error;
    }

    $conexao->close();
}
echo '<table>';
echo '<tr>';
echo '<th>Nome</th>';
echo '<th>Acertos</th>';
echo '<th>Erros</th>';
echo '<th>Data e Hora</th>';
echo '</tr>';

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        echo '<tr>';
        echo '<td>' . $linha['nome'] . '</td>';
        echo '<td>' . $linha['acertos'] . '</td>';
        echo '<td>' . $linha['erros'] . '</td>';
        echo '<td>' . $linha['data_hora'] . '</td>';
        echo '</tr>';
    }
} else {
    echo '<tr><td colspan="4">Nenhum resultado encontrado.</td></tr>';
}

echo '</table>';
?>
  </table>
  <a href="index.html">Voltar ao Jogo</a>
</body>
</html>
