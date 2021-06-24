const Discord = require('discord.js');
const {
  prefix,
  token
} = require('./config.json');
var args = process.argv.slice(2);
if (args.length <= 0) {
    console.log("U need some args dude");
    process.exit();
}

const warnMsg = "> :warning: MogusBot is in maintenance, the bot may fail during next few hours :warning:";
const readyMsg = "> :white_check_mark: MogusBot is up again normally";

const client = new Discord.Client();

client.once('ready', () => {
  console.log('A punt!');
  switch(args[0]){
      case "manteniment":
          sendWarning(warnMsg);
          break;
      case "up":
          sendWarning(readyMsg);
          break;
      case "proves":
          break;
      default:
          console.log("Command not accepted");
          process.exit();
  };
});
client.once('reconnecting', () => {
  console.log('Reconnectant!');
});
client.once('disconnect', () => {
  console.log('Desconnectat!');
});
client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.channel.send(warnMsg);
        }
});



function sendWarning(msg) {
    var guilds = client.guilds.cache;
    guilds.each(guild => {
        try {
            console.log(guild.name);
            //console.log(guild.systemChannel.name);
            if (msg.length > 0) guild.systemChannel.send(msg);
            //var channels = guild.channels.cache;
            //channels.each(channel => console.log(channel.name));
            console.log("--------");
        }
        catch(e) {
            console.log("No s'ha pogut enviar missatge a " + guild.name);
        }
    });
    return;
}

client.login(token);
