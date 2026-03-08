document.getElementById("staffForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    prenom: document.getElementById("prenom").value,
    age: document.getElementById("age").value,
    motivations: document.getElementById("motivations").value,
    experience: document.getElementById("experience").value,
    email: document.getElementById("email").value
  };

  const webhook = "https://backend-candidatures-metiers-nantesrp.onrender.com/staff";

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Erreur API");

    document.getElementById("message").textContent = "Candidature envoyée avec succès !";
    document.getElementById("staffForm").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("message").textContent = "Erreur lors de l’envoi.";
  }
});
