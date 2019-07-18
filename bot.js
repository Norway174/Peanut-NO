var fs = require('fs');
const Discord = require("discord.js");
const { Permissions } = require('discord.js');

const client = new Discord.Client();
client.config = require("./config.js");
 
client.on("ready", () => {
    console.log("I am ready!");
});
 
client.on("message", (message) => {
    const permissions = message.channel.permissionsFor(message.guild.me);
    if(!permissions.has('MANAGE_MESSAGES')) return;
    console.log(permissions.has('MANAGE_MESSAGES'));

    var swears = fs.readFileSync("./swears.txt").toString().split("\r\n")

    for (let index = 0; index < swears.length; index++) {
        const swear = swears[index].toLowerCase();
        if (message.content.toLocaleLowerCase().includes(swear)) {
            //message.channel.send("Bad word!");
            message.delete()
            .then(msg => console.log(msg))
            .catch(err => console.log(err));
            break;
        }
    }
    
});
 
client.login(client.config.token);