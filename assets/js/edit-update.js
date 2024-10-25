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

    // Função para preencher os campos com os dados do usuário
    function preencherDadosUsuario(user) {
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
    }

    // Buscar dados do usuário para exibição
    fetch(`http://localhost:80/api/user/visualizar/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dados do usuário recebidos:", data);
        if (data.status === true && data.user) {
            preencherDadosUsuario(data.user);
        } else {
            throw new Error('Erro ao carregar os dados do usuário');
        }
    })
    .catch(error => {
        console.error("Erro ao buscar os dados do usuário:", error.message);
        mensagem.textContent = 'Erro ao carregar dados: ' + error.message;
        mensagem.classList.add('alert', 'alert-danger');
    });

    // Atualização de dados do usuário
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Formulário de atualização submetido");

        const updateData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value
        };
        console.log("Dados de atualização:", updateData);

        fetch(`http://localhost:80/api/user/atualizar/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API de atualização:", data);
            if (data.status === true) {
                mensagem.textContent = 'Usuário atualizado com sucesso!';
                mensagem.classList.add('alert', 'alert-success');
                setTimeout(() => {
                    window.location.href = 'view.html';
                }, 3000); 
            } else {
                throw new Error(data.message || 'Erro ao atualizar usuário');
            }
        })
        .catch(error => {
            console.error("Erro na atualização:", error.message);
            mensagem.textContent = 'Erro ao atualizar: ' + error.message;
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
