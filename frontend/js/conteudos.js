// Seleciona o container onde os botões serão adicionados
const conteudosContainer = document.getElementById('button-group');

// Função para buscar conteúdos do backend
async function fetchConteudos() {
    try {
        const response = await fetch('http://localhost:3000/conteudos');
        if (!response.ok) {
            throw new Error('Erro ao buscar conteúdos.');
        }

        const conteudos = await response.json();

        // Cria os botões dinamicamente
        conteudos.forEach((conteudo) => {
            const button = document.createElement('a');
            button.classList.add('btn', 'btn-primary','square-button');
            button.href = `./subtopicos.html?id=${conteudo.id}`; // Link para a página do conteúdo
            button.textContent = conteudo.nome;
            button.style.margin = '10px'; // Espaçamento
            conteudosContainer.appendChild(button);
        });
    } catch (error) {
        console.error(error);
        // Exibe uma mensagem em caso de erro
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Erro ao carregar conteúdos. Tente novamente mais tarde.';
        errorMessage.classList.add('text-danger', 'text-center');
        conteudosContainer.appendChild(errorMessage);
    }
}

// Chama a função para buscar conteúdos ao carregar a página
fetchConteudos();
