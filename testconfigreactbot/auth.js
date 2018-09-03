const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const router = module.exports = express.Router();
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('./index.js');

router.get('/login', async (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=${encodeURIComponent(config.API_BASE + '/api/auth/callback')}&response_type=code&scope=identify%20guilds`);
});

router.get('/callback', async (req, res) => {
  if (!req.query.code) return res.sendStatus(400);
  const creds = btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`);
  const apiResponse = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${encodeURIComponent(config.API_BASE + '/api/auth/callback')}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${creds}`,
        'User-Agent': 'testconfigreactbot/1.0',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  const json = await apiResponse.json();
  if (json.error) return res.sendStatus(500);

  const userResponse = await fetch(`https://discordapp.com/api/users/@me`,
    {
      headers: {
        'Authorization': `Bearer ${json.access_token}`,
        'User-Agent': 'testconfigreactbot/1.0'
      }
    });
  const user = await userResponse.json();
  const jwtToken = await jwt.sign(user.id, jwtKey);
  res.send(`<script>opener.postMessage('${jwtToken}', '${config.ASSET_BASE + '/dashboard'}'); close();</script>`);
});
