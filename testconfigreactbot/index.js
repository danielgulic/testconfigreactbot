const { Client } = require('discord.js');
const client = module.exports.client = new Client({ disableEveryone: true });
const config = require('./config.js');

const r = module.exports.r = require('rethinkdbdash')({ db: 'testconfigreactbot' });
const jwtKey = module.exports.jwtKey = require('fs').readFileSync('jwt.key').toString();

client.login(config.CLIENT_TOKEN);
require('./web.js')();

client.on('ready', () => console.log('Logged in as ' + client.user.tag));

client.on('message', async msg => {
  if (msg.author.bot) return;
  if (!msg.content.toLowerCase().startsWith(config.DEFAULT_PREFIX)) return;
  const args = msg.content.split(' ');
  const command = args[0].slice(config.DEFAULT_PREFIX.length).toLowerCase();
  args.shift();
  const guild = await getGuildInfo(msg.guild.id);
  switch (command) {
    case 'ping':
      msg.channel.send('pong');
      break;
    case 'tag':
      if (!guild.config.plugins || !guild.config.plugins.tags || guild.config.plugins.tags == {}) return;
      if (!args[0]) return msg.channel.send('Available tags: ' + guild.config.plugins.tags.map(t => t.name).join(', '));
      msg.channel.send(guild.config.plugins.tags.filter(t => t.name == args[0].toLowerCase())[0].message);
    case 'viewconfig':
      msg.channel.send(guild.config);
      break;
  }
});

client.on('guildCreate', async guild => {
  if (await r.table('guilds').get(guild.id).run()) return; // guild already exists in database, we don't want to overwrite the config
  await r.table('guilds').insert({
    id: guild.id,
    config: JSON.stringify({ tags: [{ name: 'test', message: ';)' }] })
  }).run();
});

client.on('guildDelete', async guild => {
  if (config.PRESERVE_CONFIGS) return;
  await r.table('guilds').get(guild.id).delete().run();
});

const getGuildInfo = async (gid) => {
  const guild = await r.table('guilds').get(gid).run();
  guild.config = JSON.parse(guild.config);
  return guild;
}