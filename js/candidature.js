const fakeCandidatures = {
    1: {
        discord: "OmegaNugget#0001",
        age: 16,
        metier: "Police Nationale",
        motivation: "Je veux aider la ville."
    },
    2: {
        discord: "Maxime#7777",
        age: 17,
        metier: "SDIS 44",
        motivation: "Je veux sauver des vies."
    }
};

function loadCandidature() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const data = fakeCandidatures[id];
    const container = document.getElementById("candidatureDetails");

    if (!data) {
        container.innerHTML = "<p>Candidature introuvable.</p>";
        return;
    }

    container.innerHTML = `
        <p><strong>Pseudo Discord :</strong> ${data.discord}</p>
        <p><strong>Âge :</strong> ${data.age}</p>
        <p><strong>Métier :</strong> ${data.metier}</p>
        <p><strong>Motivation :</strong><br>${data.motivation}</p>
    `;
}

loadCandidature();
