module.exports = async () => {
  const express = require('express');
  const app = express();
  const { r, jwtKey, client } = require('./index.js');

  app.use(express.json());
  app.use(require('cors')());
  app.use(require('morgan')('dev'));

  app.use(require('express-jwt')({ secret: jwtKey, credentialsRequired: false }));

  app.use('/api/auth', require('./auth.js'));

  app.get('/api/heartbeat', async (req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/guilds/@me', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    res.json(await client.guilds.filter(g => g.owner.user.id === req.user).map(g => JSON.parse(JSON.stringify({
      name: g.name,
      id: g.id,
      ownerId: g.owner.user.id,
    }))));
  });

  app.get('/api/guilds/:gid', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const clientGuild = await client.guilds.get(req.params.gid);
    const dbGuild = await r.table('guilds').get(req.params.gid).run();
    if (!clientGuild || !dbGuild) return res.status(404).json({ error: 'Cannot find guild' });
    if (req.user !== clientGuild.owner.user.id) return res.sendStatus(403);

    const responseGuild = {
      name: clientGuild.name,
      id: clientGuild.id,
      config: dbGuild.config,
      iconUrl: clientGuild.iconURL({ format: 'png' }),
      splashUrl: clientGuild.splashURL({ format: 'png' }),
      ownerId: clientGuild.owner.user.id,
      ownerTag: clientGuild.owner.user.tag,
      region: clientGuild.region,
      createdAt: clientGuild.createdTimestamp,
      memberCount: clientGuild.memberCount
    }

    res.json(responseGuild);
  });

  app.listen(3000, () => console.log('API listening on port ' + 3000));
};
