document.addEventListener("DOMContentLoaded", function () {
    const pathname = window.location.pathname;

    // === LOGIN.HTML ===
    if (pathname.includes("login.html")) {
        // Redireciona se já estiver logado
        if (localStorage.getItem("loggedIn") === "true") {
            window.location.href = "center/inicial.html";
        }

        const loginForm = document.getElementById("loginForm");

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const user = document.getElementById("username").value;
                const pass = document.getElementById("password").value;
                const errorMsg = document.getElementById("errorMsg");

                if (user === "admin" && pass === "1234") {
                    localStorage.setItem("loggedIn", "true");
                    window.location.href = "center/inicial.html";
                } else {
                    errorMsg.textContent = "Usuário ou senha inválidos!";
                }
            });
        }
    }

    // === INICIAL.HTML ===
    if (pathname.includes("inicial.html")) {
        // Protege a página
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "../login.html";
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedIn");
                window.location.href = "../login.html";
                location.reload(); // Recarrega a página após o redirecionamento
            });
        }

        const goHomeBtn = document.getElementById("goHomeBtn");
        if (goHomeBtn) {
            goHomeBtn.addEventListener("click", function () {
                window.location.href = "../index.html";
            });
        }
    }
});
