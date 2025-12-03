const express = require("express");
const router = express.Router();

let discordMembers = {};

// Ajouter un membre validé
function addDiscordMember(userId) {
  discordMembers[userId] = true;
}

// Endpoint pour Roblox
router.get("/roblox/checkDiscord/:userId", (req, res) => {
  const userId = req.params.userId;
  const isMember = discordMembers[userId] || false;
  res.json({ isMember });
});

module.exports = { router, addDiscordMember };
