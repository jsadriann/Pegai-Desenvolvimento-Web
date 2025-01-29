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

        const existingLink = document.getElementById('dynamic-stylesheet');
        if (existingLink) existingLink.remove();

        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                main.innerHTML = html;
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `../assets/CSS/${page}.css`;
                link.id = 'dynamic-stylesheet';
                document.head.appendChild(link);
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

                // 🔥 Verificação de carregamento do script
                const existingScript = document.getElementById('dynamic-login-script');
                if (existingScript) {
                    console.log("Script antigo removido!");
                    existingScript.remove();
                }

                let script = document.createElement('script');
                script.src = '../assets/JS/login-cadastro.js';
                script.id = 'dynamic-login-script';
                
                // 🔥 Log para verificar se o script foi adicionado
                script.onload = function() {
                    console.log("Script login-cadastro.js carregado com sucesso!");
                    
                    // Tenta executar a função
                    if (typeof initializeForm === 'function') {
                        console.log("Função initializeForm encontrada e executada!");
                        initializeForm(); // Garantir que a função seja executada
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
        modalContent.innerHTML = ''; // Remove completamente o conteúdo do modal
        
        // Remove o CSS e o JS relacionados ao login-cadastro
        const existingLink = document.getElementById('dynamic-login-stylesheet');
        if (existingLink) {
            existingLink.remove();
        }

        const existingScript = document.getElementById('dynamic-login-script');
        if (existingScript) {
            existingScript.remove();
        }
    });

    modal.addEventListener('click', function (event) {
        if (!modalContent.contains(event.target) && event.target !== modalContent) {
            modal.style.display = "none";
            modalContent.innerHTML = ''; 
            
            // Remove o CSS e o JS relacionados ao login-cadastro
            const existingLink = document.getElementById('dynamic-login-stylesheet');
            if (existingLink) {
                existingLink.remove();
            }

            const existingScript = document.getElementById('dynamic-login-script');
            if (existingScript) {
                existingScript.remove();
            }
        }
    });
});
