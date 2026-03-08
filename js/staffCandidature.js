document.getElementById("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        prenom: document.getElementById("prenom").value,
        age: document.getElementById("age").value,
        motivations: document.getElementById("motivations").value,
        experience: document.getElementById("experience").value,
        email: document.getElementById("email").value
    };

    const webhook = "https://script.google.com/macros/s/AKfycbyBX5igOUsF5fccz6hHnlhcy3wztvjBQR04Txygwfcfel6khGDwtphixzmFrr64vFS1YA/exec";

    try {
        await fetch(webhook, {
            method: "POST",
            body: JSON.stringify(data)
        });

        document.getElementById("message").textContent = "Candidature envoyée avec succès !";
        document.getElementById("staffForm").reset();

    } catch (err) {
        document.getElementById("message").textContent = "Erreur lors de l’envoi.";
        console.error(err);
    }
});
