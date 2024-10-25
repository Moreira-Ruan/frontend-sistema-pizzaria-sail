document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registerForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value
        };

        // Enviar os dados de cadastro via API
        fetch('http://localhost:80/api/public/user/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao cadastrar o usuário');
            }
        })
        .then(data => {
            if (data.status === 201) {
                mensagem.textContent = 'Usuário cadastrado com sucesso!';
                mensagem.classList.add('alert', 'alert-success');
                setTimeout(() => {
                    window.location.href = 'signin.html'; // Redireciona para a página de login
                }, 2000);
            } else {
                mensagem.textContent = 'Erro ao cadastrar: ' + data.message;
                mensagem.classList.add('alert', 'alert-danger');
            }
        })
        .catch(error => {
            mensagem.textContent = 'Erro ao realizar o cadastro: ' + error.message;
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
