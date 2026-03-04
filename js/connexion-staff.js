document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // ⚠️ TEMPORAIRE : identifiants en dur
    const STAFF_USERNAME = "admin";
    const STAFF_PASSWORD = "nantesrp2024";

    if (username === STAFF_USERNAME && password === STAFF_PASSWORD) {
        // Connexion réussie → redirection vers le panel
        window.location.href = "staff-panel.html";
    } else {
        errorMessage.textContent = "Identifiants incorrects.";
    }
});
