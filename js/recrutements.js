document.getElementById("recrutementForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const discord = document.getElementById("discord").value.trim();
    const age = document.getElementById("age").value.trim();
    const metier = document.getElementById("metier").value;
    const motivation = document.getElementById("motivation").value.trim();

    const status = document.getElementById("statusMessage");

    const data = {
        discord,
        age,
        metier,
        motivation
    };

    try {
        const res = await fetch("https://nantesrpjobs.maxi-emy8.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            status.textContent = "Votre candidature a été envoyée avec succès !";
            status.style.color = "lightgreen";

            document.getElementById("recrutementForm").reset();
        } else {
            status.textContent = "Erreur lors de l’envoi.";
            status.style.color = "red";
        }
    } catch (err) {
        status.textContent = "Impossible de contacter le serveur.";
        status.style.color = "red";
    }
});
