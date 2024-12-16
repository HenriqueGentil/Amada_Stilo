document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('formCadastro');
    const mensagem = document.getElementById('mensagem');

    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const dataNascimento = document.getElementById('data-nascimento').value;
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        const cep = document.getElementById('cep').value;
        const rua = document.getElementById('rua').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const pais = document.getElementById('pais').value;

        // Verificar campos obrigatórios
        if (!nome || !dataNascimento || !email || !senha || !confirmarSenha || !cep || !rua || !bairro || !cidade || !estado || !pais) {
            mensagem.textContent = 'Por favor, preencha todos os campos.';
            mensagem.className = 'mensagem-erro';
            return;
        }

        // Verificar se as senhas coincidem
        if (senha !== confirmarSenha) {
            mensagem.textContent = 'As senhas não coincidem.';
            mensagem.className = 'mensagem-erro';
            return;
        }

        // Validar formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mensagem.textContent = 'Email inválido.';
            mensagem.className = 'mensagem-erro';
            return;
        }

        // Validar formato da senha
        const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!senhaRegex.test(senha)) {
            mensagem.textContent = 'A senha deve conter pelo menos 1 letra maiúscula, 1 símbolo e 1 número.';
            mensagem.className = 'mensagem-erro';
            return;
        }

        // Criar FormData
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('data-nascimento', dataNascimento);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('cep', cep);
        formData.append('rua', rua);
        formData.append('bairro', bairro);
        formData.append('cidade', cidade);
        formData.append('estado', estado);
        formData.append('pais', pais);

        // Enviar dados via Fetch API
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
                        window.location.href = "inicial.html";
                    }, 1000);
                } else {
                    mensagem.textContent = data.mensagem;
                    mensagem.className = 'mensagem-erro';
                }
            })
            .catch(error => {
                console.error('Erro no cadastro:', error);
                mensagem.textContent = 'Erro ao processar o cadastro. Tente novamente mais tarde.';
                mensagem.className = 'mensagem-erro';
            });
    });

    // Alternar visibilidade da senha
    function toggleVisibility(buttonId, inputId) {
        const button = document.getElementById(buttonId);
        const input = document.getElementById(inputId);

        button.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈'; // Ícone de "esconder"
            } else {
                input.type = 'password';
                button.textContent = '👁️'; // Ícone de "mostrar"
            }
        });
    }

    toggleVisibility('toggleSenha', 'senha');
    toggleVisibility('toggleConfirmarSenha', 'confirmar-senha');

    // Limpar formulário
    document.getElementById('limparFormulario').addEventListener('click', () => {
        formCadastro.reset();
        mensagem.textContent = '';
    });
});
