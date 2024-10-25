document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signupForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Formulário de cadastro submetido");

        const signupData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value
        };
        console.log("Dados de cadastro:", signupData);

        fetch('http://localhost:80/api/public/user/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API de cadastro:", data);
            if (data.status) {
                mensagem.textContent = 'Cadastro realizado com sucesso!';
                mensagem.classList.add('alert', 'alert-success');
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 1000);
            } else {
                throw new Error(data.message || 'Erro ao cadastrar');
            }
        })
        .catch(error => {
            console.error("Erro no cadastro:", error.message);
            mensagem.textContent = 'Erro no cadastro: ' + error.message;
            mensagem.classList.add('alert', 'alert-danger');
        });
    });
});
