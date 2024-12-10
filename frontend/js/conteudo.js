// Obtém o ID do subtópico da URL
const urlParams = new URLSearchParams(window.location.search);
const subtipoId = urlParams.get('id');
const userId = localStorage.getItem('userId');
const userActions = document.getElementById('user-actions');

// Seleciona os botões e o container de exibição de conteúdo
const buttons = document.querySelectorAll('#menu-opcoes button');
const conteudoDisplay = document.getElementById('conteudo-display');

// Referências aos botões
const favoritarBtn = document.getElementById('favoritar-btn');
const concluirBtn = document.getElementById('concluir-btn');

if (userId) {
    // Mostra os botões se o usuário estiver logado
    userActions.style.display = 'flex';
} else {
    // Esconde os botões se o usuário não estiver logado
    userActions.style.display = 'none';
}

async function updateButtonStates() {
    try {
        const favoriteResponse = await fetch(`http://localhost:3000/favorito/${userId}/${subtipoId}`);
        const concludedResponse = await fetch(`http://localhost:3000/concluido/${userId}/${subtipoId}`);

        const { favorited } = await favoriteResponse.json();
        const { concluded } = await concludedResponse.json();

        // Atualiza a aparência do botão de Favoritar
        if (favorited) {
            favoritarBtn.classList.remove('btn-outline-danger');
            favoritarBtn.classList.add('btn-danger');
        } else {
            favoritarBtn.classList.remove('btn-danger');
            favoritarBtn.classList.add('btn-outline-danger');
        }

        // Atualiza a aparência do botão de Concluir
        if (concluded) {
            concluirBtn.classList.remove('btn-outline-success');
            concluirBtn.classList.add('btn-success');
        } else {
            concluirBtn.classList.remove('btn-success');
            concluirBtn.classList.add('btn-outline-success');
        }
    } catch (error) {
        console.error('Erro ao atualizar estados dos botões:', error);
    }
}


// Função para "Favoritar"
favoritarBtn.addEventListener('click', async () => {
    const isFavorited = favoritarBtn.classList.contains('btn-danger');
    const url = `http://localhost:3000/favorito`;

    try {
        const response = await fetch(url, {
            method: isFavorited ? 'DELETE' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subtipoId }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            updateButtonStates();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erro ao alternar favorito:', error);
    }
});

// Função para "Concluir"
concluirBtn.addEventListener('click', async () => {
    const isConcluded = concluirBtn.classList.contains('btn-success');
    const url = `http://localhost:3000/concluido`;

    try {
        const response = await fetch(url, {
            method: isConcluded ? 'DELETE' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subtipoId }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            updateButtonStates();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erro ao alternar concluído:', error);
    }
});

// Atualiza os estados dos botões ao carregar a página
updateButtonStates();

// Função para buscar conteúdo do backend
async function fetchContent(type) {
    try {
        // Faz a requisição ao backend
        const response = await fetch(`http://localhost:3000/subtopico/${subtipoId}/${type}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar conteúdo.');
        }

        const data = await response.json();

        // Atualiza o conteúdo dinamicamente
        conteudoDisplay.innerHTML = ''; // Limpa o conteúdo atual

        if (type === 'video_aulas') {
            // Processa os links de vídeos e cria iframes
            const videoLinks = data.content.split('\n').filter((link) => link.trim() !== '');

            if (videoLinks.length === 0) {
                conteudoDisplay.innerHTML = '<p>Nenhuma videoaula encontrada.</p>';
                return;
            }

            videoLinks.forEach((link) => {
                const videoId = new URL(link).searchParams.get('v'); // Extrai o ID do vídeo
                if (videoId) {
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/${videoId}" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    `;
                    conteudoDisplay.appendChild(videoContainer);
                }
            });
        } else {
            // Exibe texto formatado para os outros tipos
            conteudoDisplay.innerHTML = data.content;
        }
    } catch (error) {
        console.error(error);
        conteudoDisplay.innerHTML = '<p class="text-danger">Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>';
    }
}

// Adiciona evento de clique aos botões
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        fetchContent(type);
    });
});
