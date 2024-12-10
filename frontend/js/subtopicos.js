// Obtém o ID do conteúdo a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const conteudoId = urlParams.get('id');

// Referência ao container onde os subtópicos serão exibidos
const subtopicosContainer = document.getElementById('button-group');

// Função para buscar subtópicos
async function fetchSubtopicos() {
    try {
        const response = await fetch(`http://localhost:3000/subtopicos/${conteudoId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar subtópicos.');
        }

        const subtopicos = await response.json();

        // Exibe os subtópicos dinamicamente
        subtopicos.forEach((subtopico) => {
            const card = document.createElement('a');
            card.classList.add('btn', 'btn-primary', 'square-button');
            card.href = `./conteudo.html?id=${subtopico.id}`; // Link para a página do conteúdo
            card.textContent = subtopico.nome;
            card.style.margin = '10px'; // Espaçamento
            subtopicosContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        // Exibe mensagem de erro
        subtopicosContainer.innerHTML = '<p class="text-danger">Erro ao carregar subtópicos. Tente novamente mais tarde.</p>';
    }
}

// Chama a função ao carregar a página
fetchSubtopicos();
