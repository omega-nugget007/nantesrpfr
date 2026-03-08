document.getElementById("recrutementForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: email.value,
        discord: discord.value,
        age: age.value,
        metier: metier.value,
        motivation: motivation.value
    };

    const webhook = "URL_WEBHOOK_METIERS";

    await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Recrutement envoyé !");
});
