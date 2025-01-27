document.addEventListener('DOMContentLoaded', function() {
    const regButton = document.getElementById('reg');
    const entButton = document.getElementById('ent');

    const formRegistrar = document.getElementById('form-registrar');
    const formEntrar = document.getElementById('form-entrar');

    const section = document.getElementById('form-color');
    const main = document.getElementById('main');

    regButton.addEventListener('click', function() {
        formRegistrar.classList.remove('display-none');
        formRegistrar.classList.add('form-registrar');
        formEntrar.classList.add('display-none');
        regButton.classList.remove('registrar');
        entButton.classList.add('entrar');
        section.classList.add('registrar-color');
        section.classList.remove('login-color');
        main.classList.add('registrar-color');
        main.classList.remove('login-color');
    });

    entButton.addEventListener('click', function() {
        formRegistrar.classList.add('display-none');
        formRegistrar.classList.remove('form-registrar');
        formEntrar.classList.add('form-login');
        formEntrar.classList.remove('display-none');
        entButton.classList.remove('entrar');
        regButton.classList.add('registrar');
        section.classList.remove('registrar-color');
        section.classList.add('login-color');
        main.classList.remove('registrar-color');
        main.classList.add('login-color');
    });
});
