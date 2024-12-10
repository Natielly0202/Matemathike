const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            const userId = data.user.id; // Pegamos o ID do usuário dentro do objeto `user`
            // Salva o estado de login e redireciona
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userId', userId);
            window.location.href = '../index.html';
        } else {
            alert(data.message || 'Erro ao realizar login.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
    }
});