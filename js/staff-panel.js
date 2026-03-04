let pending = [];
let accepted = JSON.parse(localStorage.getItem("accepted")) || [];
let refused = JSON.parse(localStorage.getItem("refused")) || [];

function saveAll() {
    localStorage.setItem("accepted", JSON.stringify(accepted));
    localStorage.setItem("refused", JSON.stringify(refused));
}

async function loadFromBackend() {
    try {
        const res = await fetch("https://backend-candidatures-metiers-nantesrp.onrender.com/api/candidatures");
        pending = await res.json();
        loadLists();
    } catch (e) {
        console.error("Erreur backend :", e);
    }
}

function acceptCandidature(id) {
    const cand = pending.find(c => c.id === id);
    if (!cand) return;

    accepted.push(cand);
    pending = pending.filter(c => c.id !== id);

    saveAll();
    loadLists();
}

function refuseCandidature(id) {
    const cand = pending.find(c => c.id === id);
    if (!cand) return;

    refused.push(cand);
    pending = pending.filter(c => c.id !== id);

    saveAll();
    loadLists();
}

function createCard(c, showButtons = false) {
    const card = document.createElement("div");
    card.className = "candidature-card";

    card.innerHTML = `
        <h3>${c.discord}</h3>
        <p>Métier : ${c.metier}</p>
        <p>Âge : ${c.age}</p>
    `;

    if (showButtons) {
        card.innerHTML += `
            <button class="view" onclick="viewCandidature(${c.id})">Voir</button>
            <button class="accept" onclick="acceptCandidature(${c.id})">Accepter</button>
            <button class="refuse" onclick="refuseCandidature(${c.id})">Refuser</button>
        `;
    }

    return card;
}

function loadLists() {
    const pendingList = document.getElementById("pendingList");
    const acceptedList = document.getElementById("acceptedList");
    const refusedList = document.getElementById("refusedList");

    pendingList.innerHTML = "";
    acceptedList.innerHTML = "";
    refusedList.innerHTML = "";

    pending.forEach(c => pendingList.appendChild(createCard(c, true)));
    accepted.forEach(c => acceptedList.appendChild(createCard(c, false)));
    refused.forEach(c => refusedList.appendChild(createCard(c, false)));
}

function viewCandidature(id) {
    window.location.href = `candidature.html?id=${id}`;
}

// On charge depuis le backend au démarrage
loadFromBackend();
