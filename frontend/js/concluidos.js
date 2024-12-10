document.addEventListener('DOMContentLoaded', () => {
    const completedList = document.getElementById('completed-list');

    // Obter o ID do usuário logado
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('Você precisa estar logado para acessar seus subtópicos concluídos.');
        window.location.href = './login.html'; // Redireciona para a página de login
    }

    // Função para buscar concluídos
    async function fetchCompleted() {
        try {
            const response = await fetch(`http://localhost:3000/concluidos/${userId}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar subtópicos concluídos.');
            }

            const concluidos = await response.json();

            // Limpa a lista de concluídos
            completedList.innerHTML = '';

            if (concluidos.length === 0) {
                // Exibe uma mensagem caso não haja subtópicos concluídos
                completedList.innerHTML = `
                    <p class="text-muted text-center">
                        Você ainda não concluiu nenhum subtópico. Explore os conteúdos e conclua para acompanhar aqui!
                    </p>
                `;
                return;
            } else {

            // Renderiza cada subtópico concluído
            concluidos.forEach(concluido => {
                const completedItem = document.createElement('div');
                completedItem.classList.add('completed-item');

                completedItem.innerHTML = `
                    <h3>${concluido.nome}</h3>
                    <p>${concluido.texto_teoria.slice(0, 100)}...</p> <!-- Exibe um resumo -->
                    <a href="./conteudo.html?id=${concluido.subtopicoId}" class="btn btn-primary">Revisar</a>
                `;

                completedList.appendChild(completedItem);
            });
        }
        } catch (error) {
            console.error(error);
            completedList.innerHTML = '<p class="text-danger">Erro ao carregar seus subtópicos concluídos. Tente novamente mais tarde.</p>';
        }
    }

    // Chama a função ao carregar a página
    fetchCompleted();
});
