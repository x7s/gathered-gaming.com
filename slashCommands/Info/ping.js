const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "ping",
  description: "Gives you information on how fast the Bot is",
  cooldown: 1,
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  options: [
	  {"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
  ],
  run: async (client, interaction) => {
    try{
	    const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		const StringOption = options.getString("what_ping");
		if(StringOption == "botping") { 
			await interaction.reply({content: `Getting the Bot Ping...`, ephemeral: true});
			interaction.editReply({content: `Bot Ping: \`${Math.floor((Date.now() - createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\``, ephemeral: true})
		}
		else {
		    interaction.reply({content: `Api Ping: \`${Math.floor(client.ws.ping)} ms\``, ephemeral: true})
		}
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
