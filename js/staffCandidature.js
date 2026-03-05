// Initialise EmailJS
emailjs.init("bADY6_knZXtNp7Msj");

// Récupère le formulaire
const staffForm = document.getElementById("staffForm");
const messageDiv = document.getElementById("message");

staffForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Vérifie RGPD
    const rgpd = document.getElementById("rgpd").checked;
    if (!rgpd) {
        messageDiv.textContent = "Vous devez accepter le stockage de votre e-mail pour postuler.";
        messageDiv.className = "error";
        return;
    }

    // Récupère les valeurs du formulaire
    const prenom = document.getElementById("prenom").value;
    const age = document.getElementById("age").value;
    const motivations = document.getElementById("motivations").value;
    const experience = document.getElementById("experience").value;
    const email = document.getElementById("email").value;

    // Crée une candidature staff
    const newStaff = {
        id: Date.now(),
        discord: prenom,
        age: age,
        motivations: motivations,
        experience: experience,
        email: email,
        metier: "Staff"
    };

    // Sauvegarde dans pendingStaff
    let pendingStaff = JSON.parse(localStorage.getItem("pendingStaff")) || [];
    pendingStaff.push(newStaff);
    localStorage.setItem("pendingStaff", JSON.stringify(pendingStaff));

    // Ajoute la candidature dans pending du panel
    pending.push(newStaff);
    loadLists();

    // Envoie mail via EmailJS
    emailjs.send("service_6a5oi6d", "template_pejmkhf", {
        name: prenom,
        email: email,
        age: age,
        motivations: motivations,
        experience: experience,
        status: "en attente"
    }).then(() => {
        messageDiv.textContent = "Votre candidature a été envoyée avec succès !";
        messageDiv.className = "success";
        staffForm.reset();
    }).catch((error) => {
        messageDiv.textContent = "Erreur lors de l'envoi, veuillez réessayer.";
        messageDiv.className = "error";
        console.error(error);
    });
});