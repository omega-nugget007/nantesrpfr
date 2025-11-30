const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const CLIENT_ID = "1444348481732083824";
const CLIENT_SECRET = "TpmJ_qClgdE7P_oGNKlV0GYDBJhk0yCG";
const REDIRECT_URI = "https://nantesrpfr.onrender.com/callback";
const TARGET_GUILD_ID = "1386848639732809759";
const staffRoutes = require("./staff");
app.use("/", staffRoutes);


// Servir les fichiers statiques (index.html, index.css)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


// Route pour afficher Oauth.html (page de connexion)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Oauth.html"));
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
      // ✅ Stocker le token côté client et rediriger vers index.html
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
    console.error(err.response?.data || err.message);
    res.status(500).send("Erreur lors de la connexion OAuth2");
  }
});

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));


