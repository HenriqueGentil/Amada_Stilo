document.getElementById("formLogin").addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    if (!email || !senha) {
        mensagem.textContent = 'Por favor, preencha todos os campos.';
        mensagem.className = 'mensagem-erro';
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('senha', senha);


    fetch('login-cliente.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'sucesso') {
            mensagem.textContent = data.mensagem;
            mensagem.className = 'mensagem-sucesso';
            setTimeout(() => {
                window.location.href = "loja.html"; // Redireciona para a página da loja
            }, 1000);
        } else {
            mensagem.textContent = data.mensagem;
            mensagem.className = 'mensagem-erro';
        }
    })
    .catch(error => {
        mensagem.textContent = 'Erro ao processar o login. Tente novamente.';
        mensagem.className = 'mensagem-erro';
    });
    
});



