document.getElementById("recrutementForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: email.value,
        discord: discord.value,
        age: age.value,
        metier: metier.value,
        motivation: motivation.value
    };

    const webhook = "https://script.google.com/macros/s/AKfycby8TNJJPfEa7UmvR85BaQwUUJJF0Uln-Se2N3Hfxdoir3p2Y6996dF1j6qNPJmFOD9X/exec";

    await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Recrutement envoyé !");
});
