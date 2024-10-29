document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    const mensagem = document.getElementById('mensagem');

    console.log("Token atual:", token);

    if (!token) {
        alert('Usuário não encontrado. Faça login novamente.');
        window.location.href = 'signin.html';
        return;
    }

    // Função de logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        console.log("Solicitando logout...");
        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Logout bem-sucedido, limpando dados...");
            localStorage.clear();
            window.location.href = 'signin.html';
        })
        .catch(error => {
            console.error("Erro ao realizar logout:", error);
            mensagem.textContent = 'Erro ao realizar logout.';
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
