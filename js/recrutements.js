document.getElementById("recrutementForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: email.value,
        discord: discord.value,
        age: age.value,
        metier: metier.value,
        motivation: motivation.value
    };

    const webhook = "https://backend-candidatures-metiers-nantesrp.onrender.com/metiers";

    await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Recrutement envoyé !");
});
