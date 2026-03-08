document.getElementById("recrutementForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: email.value,
        discord: discord.value,
        age: age.value,
        metier: metier.value,
        motivation: motivation.value
    };

    const webhook = "https://script.google.com/macros/s/AKfycbyD7a9yafk45pQkeT21CLwe4-No_C_-0Qx_OBNta4O95bZBMnytqaUR3MH1Mu15e9cs/exec";

    await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Recrutement envoyé !");
});
