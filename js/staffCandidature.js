document.getElementById("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        prenom: document.getElementById("prenom").value,
        age: document.getElementById("age").value,
        motivations: document.getElementById("motivations").value,
        experience: document.getElementById("experience").value,
        email: document.getElementById("email").value
    };

    const webhook = "https://script.google.com/macros/s/AKfycbwu975F5upHCZShYw5Ht6mlrr_UWKr7AV0yFYx4Goe9jqKaxwtsTdHJpE8Tw0bTJ2rQ/exec";

    try {
        await fetch(webhook, {
            method: "POST",
            body: JSON.stringify(data)
        });

        alert("Candidature staff envoyée !");
    } catch (err) {
        alert("Erreur lors de l’envoi.");
        console.error(err);
    }
});
