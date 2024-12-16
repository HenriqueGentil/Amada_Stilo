document.addEventListener('DOMContentLoaded', () => {
    const formaPagamento = document.getElementById('forma-pagamento');
    const dadosCartao = document.getElementById('dados-cartao');
    const salvar = document.getElementById('salvar');
    const cancelar = document.getElementById('cancelar');
  
    // Exibir ou ocultar os campos do cartão de crédito/débito
    formaPagamento.addEventListener('change', () => {
      if (formaPagamento.value === 'cartao-credito' || formaPagamento.value === 'cartao-debito') {
        dadosCartao.style.display = 'block';
      } else {
        dadosCartao.style.display = 'none';
      }
    });
  
    // Salvar dados
    salvar.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Seus dados foram atualizados com sucesso!');
      salvar.addEventListener('click', () => {
        window.Location.href='Loja.html';
      },1000)
    });
  
    // Cancelar e redirecionar para a loja
    cancelar.addEventListener('click', () => {
      window.location.href = 'Loja.html'; // Substitua pelo link da sua loja
    });
  });
  
document.getElementById('logout').addEventListener('click', function () {
    fetch('sair.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'sucesso') {
                window.location.href = "inicial.html"; // Redireciona para o login
            }
        });
});
