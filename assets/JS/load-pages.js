document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu a');
    const modal = document.getElementById('loginModal');
    const modalContent = document.getElementById('modalContent');
    const loginBtn = document.getElementById('loginbtn');
    const closeModalBtn = document.getElementById('closeModal');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            menuLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            const page = e.target.getAttribute('data-content');
            loadPageContent(page);
        });
    });

    function loadPageContent(page) {
        const main = document.getElementById('main');
        main.innerHTML = '';

        // Remove estilos e scripts antigos antes de carregar novos
        const existingLink = document.getElementById('dynamic-stylesheet');
        if (existingLink) existingLink.remove();

        const existingScript = document.getElementById('dynamic-script');
        if (existingScript) existingScript.remove();

        // Carrega o HTML
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                main.innerHTML = html;

                // Adiciona CSS dinâmico
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `../assets/CSS/${page}.css`;
                link.id = 'dynamic-stylesheet';
                document.head.appendChild(link);

                // Adiciona JavaScript dinâmico
                const script = document.createElement('script');
                script.src = `../assets/JS/${page}.js`;
                script.id = 'dynamic-script';

                script.onload = function () {
                    console.log(`${page}.js carregado!`);

                    // Tenta chamar a função de inicialização correspondente
                    const functionName = `initialize${page.charAt(0).toUpperCase() + page.slice(1)}`;
                    if (typeof window[functionName] === 'function') {
                        console.log(`Chamando ${functionName}()`);
                        window[functionName]();
                    } else {
                        console.error(`Erro: Função ${functionName} não encontrada!`);
                    }
                };

                script.onerror = function () {
                    console.error(`Erro ao carregar ${page}.js!`);
                };

                document.body.appendChild(script);
            })
            .catch(err => {
                main.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
                console.error('Erro ao carregar o conteúdo:', err);
            });
    }

    loginBtn.addEventListener('click', function () {
        modal.style.display = "block";
        document.body.classList.add('modal-open');

        fetch('login-cadastro.html')
            .then(response => response.text())
            .then(data => {
                modalContent.innerHTML = data;

                const existingLink = document.getElementById('dynamic-login-stylesheet');
                if (existingLink) existingLink.remove();
                
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '../assets/CSS/login-cadastro.css';
                link.id = 'dynamic-login-stylesheet';
                document.head.appendChild(link);

                const existingScript = document.getElementById('dynamic-login-script');
                if (existingScript) existingScript.remove();

                let script = document.createElement('script');
                script.src = '../assets/JS/login-cadastro.js';
                script.id = 'dynamic-login-script';

                script.onload = function() {
                    console.log("Script login-cadastro.js carregado com sucesso!");

                    if (typeof initializeForm === 'function') {
                        console.log("Função initializeForm encontrada e executada!");
                        initializeForm();
                    } else {
                        console.error("Erro: Função initializeForm não foi carregada!");
                    }
                };

                script.onerror = function() {
                    console.error("Erro ao carregar o script login-cadastro.js!");
                };

                document.body.appendChild(script);
            })
            .catch(error => console.log('Erro ao carregar o conteúdo:', error));
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
        modalContent.innerHTML = ''; 

        const existingLink = document.getElementById('dynamic-login-stylesheet');
        if (existingLink) existingLink.remove();

        const existingScript = document.getElementById('dynamic-login-script');
        if (existingScript) existingScript.remove();
    });

    modal.addEventListener('click', function (event) {
        if (!modalContent.contains(event.target) && event.target !== modalContent) {
            modal.style.display = "none";
            modalContent.innerHTML = ''; 

            const existingLink = document.getElementById('dynamic-login-stylesheet');
            if (existingLink) existingLink.remove();

            const existingScript = document.getElementById('dynamic-login-script');
            if (existingScript) existingScript.remove();
        }
    });
});
