const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const CLIENT_ID = "1444348481732083824";
const CLIENT_SECRET = "TpmJ_qClgdE7P_oGNKlV0GYDBJhk0yCG";
const REDIRECT_URI = "https://nantesrpfr.onrender.com/callback";
const TARGET_GUILD_ID = "1386848639732809759";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Routes staff
const staffRoutes = require("./staff");
app.use("/", staffRoutes);

// Page de connexion
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Oauth.html"));
});

let kickLogs = [];

// Logs envoyés par Roblox
app.post("/roblox/kicklogs", (req, res) => {
  const { staff, target, message, timestamp } = req.body;

  if (!staff || !target || !message) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const log = { staff, target, message, timestamp: timestamp || Date.now() };
  kickLogs.push(log);

  console.log("Nouveau log reçu :", log);
  res.json({ success: true });
});

// Récupération des logs
app.get("/roblox/kicklogs", (req, res) => {
  res.json(kickLogs);
});

let currentPlayers = [];

// Mise à jour des joueurs
app.post("/roblox/players", express.json(), (req, res) => {
  currentPlayers = req.body;
  console.log("Joueurs reçus:", currentPlayers);
  res.sendStatus(200);
});

// Liste des joueurs
app.get("/roblox/players", (req, res) => {
  res.json(currentPlayers);
});

// ⚠️ SUPPRESSION des routes d'action (kick, etc.)
// On ne permet plus d'envoyer d'actions depuis le site.
// Si quelqu’un tente un POST sur /roblox/action, on renvoie une erreur.
app.post("/roblox/action", (req, res) => {
  res.status(403).json({ error: "Action interdite depuis le site." });
});

app.get("/roblox/action/:userId", (req, res) => {
  res.json({}); // aucune action disponible
});

// Routes supplémentaires
app.get("/metier.html", (req, res) => {
  res.sendFile(path.join(__dirname, "metier.html"));
});

app.get("/collaboration.html", (req, res) => {
  res.sendFile(path.join(__dirname, "collaboration.html"));
});

app.get("/support.html", (req, res) => {
  res.sendFile(path.join(__dirname, "support.html"));
});

// Callback OAuth2
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: "identify guilds"
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const guildsResponse = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const username = userResponse.data.username;
    const guilds = guildsResponse.data;

    const isInTargetGuild = guilds.some(g => g.id === TARGET_GUILD_ID);

    if (isInTargetGuild) {
      res.send(`
        <script>
          localStorage.setItem("discord_token", "${accessToken}");
          window.location.href = "/menu.html";
        </script>
      `);
    } else {
      res.send(`<h1>Désolé ${username}, tu n'es pas membre du serveur requis ❌</h1>`);
    }

  } catch (err) {
    console.error("Erreur OAuth2:", err.response?.data || err.message);
    res.status(500).send("Erreur lors de la connexion OAuth2");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
