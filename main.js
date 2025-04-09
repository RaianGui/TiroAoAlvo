window.onload = function () {
    setTimeout(function () {
      document.getElementById("popup").show();
      document.getElementById("a").value=acertos;
      document.getElementById("e").value=erros;
    }, tempoDeJogo*1000)
  };
  var tempoDeJogo = 10; // Tempo de jogo em segundos
  var contadorTempo;

  // Variáveis para os resultados
  var tentativas = 0;
  var acertos = 0;
  var erros = 0;

  // Função para mover a imagem aleatoriamente dentro do campo
  function moverImagemAleatoriamente() {
    var campo = document.getElementById('cenario');
    var imagem = document.getElementById('imagem');

    // Obtem as dimensões do campo
    var campoWidth = campo.clientWidth;
    var campoHeight = campo.clientHeight;

    // Obtem as dimensões da imagem
    var imagemWidth = imagem.clientWidth;
    var imagemHeight = imagem.clientHeight;

    // Gera uma posição aleatória dentro do campo
    var x = Math.random() * (campoWidth - imagemWidth);
    var y = Math.random() * (campoHeight - imagemHeight);

    // Define a nova posição da imagem
    imagem.style.left = x + 'px';
    imagem.style.top = y + 'px';
  }

  // Configura o contador de tempo
  contadorTempo = setInterval(function () {
    tempoDeJogo--;
    if (tempoDeJogo <= 0) {
      clearInterval(contadorTempo); // Para o contador de tempo
      exibirPopupNome();
    }
  }, 1000); // Atualiza a cada segundo

  function exibirPopupNome() {
setTimeout(function() {
  var nome = prompt("Digite seu nome:");
  if (nome !== null && nome !== "") {
    // Salva os resultados no banco de dados
    salvarResultados(nome, acertos, erros);
    // Atualiza o ranque
    atualizarRanque();
    window.location.href = "ranque.php";
  } else {
    alert("Nome inválido. Tente novamente.");
    exibirPopupNome();
  }
}, 100); // Aguarde 100 milissegundos
}


  function salvarResultados(nome, acertos, erros) {
    var xhr = new XMLHttpRequest();
    var url = "salvar_resultados.php"; // O arquivo PHP no servidor

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Dados que serão enviados
    var data = "nome=" + nome + "&acertos=" + acertos + "&erros=" + erros;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // A resposta da API 
        console.log(xhr.responseText);
      }
    };

    xhr.send(data);
  }

  // Chama a função para mover a imagem aleatoriamente quando a página carregar
  window.onload = moverImagemAleatoriamente;

  // Função para atualizar os resultados
  function atualizarResultados() {
    document.getElementById('tentativas').innerText = tentativas;
    document.getElementById('acertos').innerText = acertos;
    document.getElementById('erros').innerText = erros;
  }

  // Função para reproduzir o som de acerto
  function reproduzirSomAcerto() {
    var audio = new Audio('death-endermen.mp3'); // Som de acerto
    audio.play();
  }

  //Evento de clique no documento para verificar acertos e erros
  document.addEventListener('click', function (event) {
    // Verifica se o clique foi na imagem
    if (event.target.id === 'imagem') {
      acertos++;
      // Chama função para reproduzir o som de acerto
      reproduzirSomAcerto();
    } else {
      erros++;
    }

    tentativas++;

    // Atualiza os resultados e move novamente a imagem
    atualizarResultados();
    moverImagemAleatoriamente();
  });