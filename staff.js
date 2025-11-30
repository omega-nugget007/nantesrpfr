const express = require("express");
const router = express.Router();

// Simule une "base de données" staff
const staffDB = [
  { username: "Maxime", code: "SECRET123" },
  { username: "AdminUser", code: "ADMIN456" }
];

// Vérification: POST /staff-login
router.post("/staff-login", (req, res) => {
  console.log("POST /staff-login body:", req.body);
  const { username, secretCode } = req.body;

  if (!username || !secretCode) {
    console.warn("Champs manquants:", { username, secretCode });
    return res.status(400).send("Champs manquants");
  }

  const match = staffDB.find(
    u => u.username === username && u.code === secretCode
  );

  if (!match) {
    console.warn("Accès refusé pour:", username);
    return res.redirect("/menu.html");
  }

  // ✅ accès autorisé → renvoie une page qui set le localStorage puis redirige
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Redirection</title></head>
    <body>
      <script>
        try {
          localStorage.setItem("staff_access", "true");
          localStorage.setItem("staff_username", ${JSON.stringify(username)});
          window.location.href = "/staff-panel.html";
        } catch (e) {
          window.location.href = "/staff-panel.html";
        }
      </script>
    </body>
    </html>
  `;
  res.status(200).send(html);
});

module.exports = router;
