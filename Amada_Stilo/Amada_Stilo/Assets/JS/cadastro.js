// Função para validar o formulário
document.getElementById("formCadastro").addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome').value.trim();
    const dataNascimento = document.getElementById('data-nascimento').value;
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const mensagem = document.getElementById('mensagem');

    // Verifica se todos os campos estão preenchidos
    if (!nome || !dataNascimento || !email || !senha || !confirmarSenha) {
        mensagem.textContent = 'Por favor, preencha todos os campos.';
        mensagem.className = 'mensagem-erro';
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        mensagem.textContent = 'As senhas não coincidem.';
        mensagem.className = 'mensagem-erro';
        return;
    }

    // Verifica se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensagem.textContent = 'Email inválido.';
        mensagem.className = 'mensagem-erro';
        return;
    }

    // Verifica os critérios da senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!senhaRegex.test(senha)) {
        mensagem.textContent = 'A senha deve conter pelo menos 1 letra maiúscula, 1 símbolo e 1 número.';
        mensagem.className = 'mensagem-erro';
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('data-nascimento', dataNascimento);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('confirma-senha', confirmarSenha);
    
    fetch('cadastro-cliente.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'sucesso') {
            mensagem.textContent = data.mensagem;
            mensagem.className = 'mensagem-sucesso';
            setTimeout(() => {
                window.location.href = "inicial.html"; // Redireciona para a página da loja
            }, 1000);
        } else {
            mensagem.textContent = data.mensagem;
            mensagem.className = 'mensagem-erro';
        }
    })
    .catch(error => {
        mensagem.textContent = 'Erro ao processar o cadastro. Tente novamente.';
        mensagem.className = 'mensagem-erro';
    });
});

// Função para alternar a visibilidade da senha
document.getElementById('toggleSenha').addEventListener('click', function () {
    const senhaInput = document.getElementById('senha');
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        this.textContent = '🙈'; // Ícone de "esconder"
    } else {
        senhaInput.type = 'password';
        this.textContent = '👁️'; // Ícone de "mostrar"
    }
});

// Função para alternar a visibilidade da confirmação de senha
document.getElementById('toggleConfirmarSenha').addEventListener('click', function () {
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    if (confirmarSenhaInput.type === 'password') {
        confirmarSenhaInput.type = 'text';
        this.textContent = '🙈'; // Ícone de "esconder"
    } else {
        confirmarSenhaInput.type = 'password';
        this.textContent = '👁️'; // Ícone de "mostrar"
    }
});

// Função para limpar o formulário
document.getElementById('limparFormulario').addEventListener('click', function () {
    document.getElementById('formCadastro').reset();
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = ''; // Remove mensagens de erro/sucesso
});
