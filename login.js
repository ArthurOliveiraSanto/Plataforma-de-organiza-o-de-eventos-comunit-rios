window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

const header = document.getElementById('main-header');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

const tabs = document.querySelectorAll('.auth-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.auth-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

const switchTabs = document.querySelectorAll('.switch-tab');
switchTabs.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');

        document.querySelectorAll('.auth-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('#login-email').value;
    const password = this.querySelector('#login-password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    console.log('Login attempt:', { email, password });
    alert('Login realizado com sucesso! Redirecionando...');
});

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('#register-name').value;
    const email = this.querySelector('#register-email').value;
    const password = this.querySelector('#register-password').value;
    const confirmPassword = this.querySelector('#register-confirm-password').value;
    const terms = this.querySelector('#terms').checked;

    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (!terms) {
        alert('Você deve aceitar os Termos de Serviço e Política de Privacidade.');
        return;
    }

    console.log('Registration:', { name, email, password });
    alert('Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua conta.');

    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');

    document.querySelectorAll('.auth-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('login-tab').classList.add('active');

    this.reset();
});