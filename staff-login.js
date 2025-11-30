const express = require("express");
const router = express.Router();

// Exemple de "base de données" en dur
const staffDB = [
  { username: "emyx_gamer", code: "10" },
  { username: "AdminUser", code: "ADMIN456" }
];

// Route de connexion staff
router.post("/staff-login", (req, res) => {
  const { username, secretCode } = req.body;

  const match = staffDB.find(
    u => u.username === username && u.code === secretCode
  );

  if (match) {
    // ✅ accès autorisé
    res.redirect("/staff-panel.html");
  } else {
    // ❌ accès refusé
    res.redirect("/menu.html");
  }
});

module.exports = router;
