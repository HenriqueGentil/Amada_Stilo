document.addEventListener('DOMContentLoaded', function () {
    const formContato = document.getElementById('formContato');
    const mensagem = document.getElementById('mensagem');

    // Adiciona um evento de submit ao formulário
    formContato.addEventListener('submit', function (event) {
        event.preventDefault();

        // Recupera os valores do formulário
        const assunto = document.getElementById('assunto').value.trim();
        const mensagemTexto = document.getElementById('mensagemTexto').value.trim();

        // Verifica se os campos estão preenchidos
        if (!assunto || !mensagemTexto) {
            mensagem.textContent = 'Por favor, preencha todos os campos.';
            mensagem.className = 'mensagem-erro';
            return;
        }

        // Envia os dados usando a Fetch API
        fetch('contato.php', {
            method: 'POST',
            body: new FormData(formContato)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'sucesso') {
                    mensagem.textContent = data.mensagem;
                    mensagem.className = 'mensagem-sucesso';
                    setTimeout(() => {
                        window.location.href = "contato.php"; // Redireciona para a página da loja
                    }, 1000);
                } else {
                    mensagem.textContent = data.mensagem;
                    mensagem.className = 'mensagem-erro';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                mensagem.textContent = 'Erro ao processar a solicitação. Tente novamente mais tarde.';
                mensagem.className = 'mensagem-erro';
            });
    });

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
});
