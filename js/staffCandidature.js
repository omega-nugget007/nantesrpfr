document.getElementById("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        prenom: prenom.value,
        age: age.value,
        motivations: motivations.value,
        experience: experience.value,
        email: email.value
    };

    const webhook = "URL_WEBHOOK_STAFF";

    await fetch(webhook, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Candidature envoyée !");
});
