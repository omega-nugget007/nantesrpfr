const express = require("express");
const router = express.Router();

// Exemple de "base de données" en dur
const staffDB = [
  { username: "Maxime", code: "SECRET123" },
  { username: "AdminUser", code: "ADMIN456" }
];

// Route POST pour la connexion staff
router.post("/staff-login", (req, res) => {
  const { username, secretCode } = req.body;

  if (!username || !secretCode) {
    return res.status(400).send("Champs manquants");
  }

  const match = staffDB.find(
    u => u.username === username && u.code === secretCode
  );

  if (match) {
    // ✅ accès autorisé → injecte JS pour stocker et rediriger
    res.send(`
      <script>
        localStorage.setItem("staff_access", "true");
        localStorage.setItem("staff_username", "${username}");
        window.location.href = "/staff-panel.html";
      </script>
    `);
  } else {
    // ❌ accès refusé → retour au menu
    res.redirect("/menu.html");
  }
});

module.exports = router;
