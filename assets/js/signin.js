document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('loginForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o comportamento padrão de enviar o formulário

        const loginData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        // Enviar os dados de login via API
        fetch('http://localhost:80/api/public/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();  // Converte a resposta para JSON
            } else {
                throw new Error('Credenciais inválidas'); // Mensagem de erro clara
            }
        })
        .then(data => {
            if (data.usuario && data.usuario.token) {
                localStorage.setItem('token', data.usuario.token);
                localStorage.setItem('userId', data.usuario.id);
                mensagem.textContent = `Bem-vindo, ${data.usuario.name}! Login realizado com sucesso.`;
                mensagem.classList.remove('alert-danger');
                mensagem.classList.add('alert', 'alert-success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';  // Redireciona após 1 segundo
                }, 1000); 
            } else {
                throw new Error('Credenciais inválidas');
            }
        })
        .catch(error => {
            mensagem.textContent = 'Erro no login: ' + error.message;
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
