const favoriteList = document.getElementById('favorite-list');

// Obter o ID do usuário logado
const userId = localStorage.getItem('userId');

if (!userId) {
    alert('Você precisa estar logado para acessar seus favoritos.');
    window.location.href = './login.html'; // Redireciona para a página de login
}

// Função para buscar favoritos
async function fetchFavorites() {
    try {
        const response = await fetch(`http://localhost:3000/favoritos/${userId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar favoritos.');
        }

        const favoritos = await response.json();

        // Limpa a lista de favoritos
        favoriteList.innerHTML = '';

        // Renderiza cada favorito
        favoritos.forEach(favorito => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');

            favoriteItem.innerHTML = `
                <h3>${favorito.nome}</h3>
                <p>${favorito.texto_teoria.slice(0, 100)}...</p> <!-- Exibe um resumo -->
                <a href="./conteudo.html?id=${favorito.subtopicoId}" class="btn btn-primary">Acessar</a>
            `;

            favoriteList.appendChild(favoriteItem);
        });
    } catch (error) {
        console.error(error);
        favoriteList.innerHTML = '<p class="text-danger">Erro ao carregar seus favoritos. Tente novamente mais tarde.</p>';
    }
}

// Chama a função ao carregar a página
fetchFavorites();
