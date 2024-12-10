// Referência ao formulário de cadastro
const cadastroForm = document.querySelector('form');

cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const dt_nascimento = document.getElementById('dt_nascimento').value;
    const ocupacao = document.getElementById('ocupacao').value;

    try {
        // Faz a requisição para o backend
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha, dt_nascimento, ocupacao }),
        });

        const data = await response.json();

        if (response.ok) {
        showNotification('Cadastro realizado com sucesso! Faça o login.', 'success');
        setTimeout(() => {
            window.location.href = './login.html'; // Redireciona após 3 segundos
        }, 3000);
        } else {
            showNotification(data.message || 'Erro ao realizar cadastro.', 'error');
        }
    } catch (error) {
        console.error('Erro ao realizar cadastro:', error);
        alert('Erro ao conectar ao servidor.');
    }
});
