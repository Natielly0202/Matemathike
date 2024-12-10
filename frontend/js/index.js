// Verifica se o usuário está logado
const isLoggedIn = localStorage.getItem('loggedIn'); // Exemplo de checagem

// Referência ao menu
const menu = document.getElementById('menu');

if (isLoggedIn === 'true') {
    // Menu para usuários logados
    menu.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="./index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="./html/conteudosUsuario.html">Conteúdos</a></li>
        <li class="nav-item"><a class="nav-link" href="./html/favoritos.html">Favoritos</a></li>
        <li class="nav-item"><a class="nav-link" href="./html/concluidos.html">Concluídos</a></li>
        
        <li class="nav-item"><a class="nav-link btn btn-outline-light me-2" href="#" id="logout">Sair</a></li>
    `;
} else {
    // Menu para usuários deslogados
    menu.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="./index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="./html/conteudosUsuario.html">Conteúdos</a></li>
        <li class="nav-item"><a class="nav-link btn btn-outline-light me-2" href="./html/login.html">Login</a></li>
        <li class="nav-item"><a class="nav-link btn btn-light text-dark" href="./html/cadastro.html">Cadastro</a></li>
    `;
}

// Logout
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'false'); // Marca como deslogado
        localStorage.removeItem('userId');
        window.location.reload(); // Recarrega a página
    });
}
