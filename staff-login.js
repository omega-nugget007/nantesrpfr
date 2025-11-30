const express = require("express");
const router = express.Router();

const staffDB = [
  { username: "Maxime", code: "SECRET123" },
  { username: "AdminUser", code: "ADMIN456" }
];

router.post("/staff-login", (req, res) => {
  const { username, secretCode } = req.body;
  const match = staffDB.find(u => u.username === username && u.code === secretCode);

  if (match) {
    res.send(`
      <script>
        localStorage.setItem("staff_access", "true");
        localStorage.setItem("staff_username", "${username}");
        window.location.href = "/staff-panel.html";
      </script>
    `);
  } else {
    res.redirect("/menu.html");
  }
});

module.exports = router;
