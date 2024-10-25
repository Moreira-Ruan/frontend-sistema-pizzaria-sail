document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('loginForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Formulário de login submetido");

        // Dados de login capturados do formulário
        const loginData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        console.log("Dados de login:", loginData);

        // Enviando dados de login via API
        fetch('http://localhost:80/api/public/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API:", data);
            if (data.status && data.token) {
                // Armazena token e ID do usuário
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user.id);
                mensagem.textContent = `Bem-vindo, ${data.user.name}! Login realizado com sucesso.`;
                mensagem.classList.remove('alert-danger');
                mensagem.classList.add('alert', 'alert-success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000); 
            } else {
                throw new Error(data.message || 'Credenciais inválidas');
            }
        })
        .catch(error => {
            console.error("Erro no processo:", error.message);
            mensagem.textContent = 'Erro no login: ' + error.message;
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
    