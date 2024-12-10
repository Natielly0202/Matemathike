function showNotification(message, type = 'success') {
    // Encontra o container de notificações
    const container = document.getElementById('notification-container');

    // Cria a notificação
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (type === 'error') {
        notification.classList.add('error');
    }
    notification.textContent = message;

    // Adiciona a notificação ao container
    container.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
