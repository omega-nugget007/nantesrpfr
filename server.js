const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const CLIENT_ID = "1444348481732083824";
const CLIENT_SECRET = "TpmJ_qClgdE7P_oGNKlV0GYDBJhk0yCG";
const REDIRECT_URI = "https://nantesrpfr.onrender.com/callback";
const TARGET_GUILD_ID = "1386848639732809759";

// Middleware pour lire les formulaires et JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir les fichiers statiques (menu.html, staff-login.html, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Importer et brancher les routes staff
const staffRoutes = require("./staff");
app.use("/", staffRoutes);

// Route pour afficher Oauth.html (page de connexion)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Oauth.html"));
});

let currentPlayers = []; // variable globale pour stocker la liste

// Roblox envoie la liste ici
app.post("/roblox/players", (req, res) => {
  currentPlayers = req.body; // [{name:"Maxime", userId:123}, ...]
  res.sendStatus(200);
});

// Ton staff-panel ou ton navigateur peut la lire ici
app.get("/roblox/players", (req, res) => {
  res.json(currentPlayers);
});


// Callback OAuth2
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Échange du code contre un token
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

    // Infos utilisateur
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    // Serveurs
    const guildsResponse = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const username = userResponse.data.username;
    const guilds = guildsResponse.data;

    // Vérifier si l'utilisateur est dans le serveur cible
    const isInTargetGuild = guilds.some(g => g.id === TARGET_GUILD_ID);

    if (isInTargetGuild) {
      // ✅ Stocker le token côté client et rediriger vers menu.html
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
