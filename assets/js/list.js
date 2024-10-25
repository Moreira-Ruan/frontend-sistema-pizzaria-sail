document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    const mensagem = document.getElementById("mensagemErro");
    console.log("Token atual:", token);

    if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        window.location.href = "signin.html";
        return;
    }

    // Função para buscar e exibir a lista de usuários
    function carregarUsuarios() {
        fetch("http://localhost:80/api/user/listar", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta completa da API:", data);

            // Verifica se a resposta da API contém a lista de usuários em data.data
            if (data && data.data) {
                const usuarios = data.data; // Acessa a lista de usuários dentro de data.data
                console.log("Lista de usuários recebida:", usuarios);

                const tabelaUsuarios = document.getElementById("tabelaUsuarios");

                // Itera sobre cada usuário na lista e adiciona uma linha à tabela
                usuarios.forEach((user, index) => {
                    const row = tabelaUsuarios.insertRow();

                    const cellIndex = row.insertCell(0);
                    const cellName = row.insertCell(1);
                    const cellEmail = row.insertCell(2);
                    const cellCreationDate = row.insertCell(3);
                    const cellActions = row.insertCell(4);

                    cellIndex.textContent = index + 1;

                    // Preenche cada célula com os dados do usuário
                    cellName.textContent = user.name;
                    cellEmail.textContent = user.email;
                    cellCreationDate.textContent = new Date(user.created_at).toLocaleString("pt-BR");

                    // Botão de exclusão
                    const deleteButton = document.createElement("button");
                    deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; // Ícone de lixeira
                    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
                    deleteButton.onclick = () => excluirUsuario(user.id);
                    cellActions.appendChild(deleteButton);
                });
            } else {
                console.warn("Dados da lista de usuários não encontrados.");
                if (mensagem) {
                    mensagem.textContent = data.message || 'Erro ao carregar a lista de usuários.';
                    mensagem.classList.add('alert', 'alert-danger');
                }
            }
        })
        .catch(error => {
            console.error("Erro ao carregar lista de usuários:", error);
            if (mensagem) {
                mensagem.textContent = 'Erro ao carregar a lista de usuários.';
                mensagem.classList.add('alert', 'alert-danger');
            }
        });
    }

    // Função para excluir um usuário específico
    function excluirUsuario(userId) {
        if (!confirm("Tem certeza de que deseja excluir este usuário?")) return;

        fetch(`http://localhost:80/api/user/deletar/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`Usuário com ID ${userId} deletado com sucesso.`);
                location.reload(); // Recarrega a página para atualizar a lista
            } else {
                console.error("Erro ao deletar o usuário:", response);
            }
        })
        .catch(error => console.error("Erro ao deletar o usuário:", error));
    }

    // Chamando a função para carregar os usuários ao carregar a página
    carregarUsuarios();

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", function() {
        fetch("http://localhost:80/api/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.clear();
                window.location.href = "signin.html";
            } else {
                console.error("Erro ao deslogar");
            }
        })
        .catch(error => console.error("Erro ao realizar o logout:", error));
    });
});
