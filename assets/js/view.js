document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const mensagem = document.getElementById('mensagem');

    console.log("Token atual:", token, "ID do usuário:", userId);

    if (!token || !userId) {
        alert('Usuário não encontrado. Faça login novamente.');
        window.location.href = 'signin.html';
        return;
    }

    fetch(`http://localhost:80/api/user/visualizar/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dados do usuário recebidos:", data);
        if (data.status === 200) {
            document.getElementById('userName').textContent = data.user.name;
            document.getElementById('userEmail').textContent = data.user.email;
            document.getElementById('userCreated').textContent = new Date(data.user.created_at).toLocaleString();
            document.getElementById('userInfo').classList.remove('d-none');
        } else {
            throw new Error('Erro ao carregar dados do usuário');
        }
    })
    .catch(error => {
        console.error("Erro ao carregar dados do usuário:", error.message);
        mensagem.textContent = error.message;
        mensagem.classList.add('alert', 'alert-danger');
    });
});
