const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "say",
    category: "Administration",
    aliases: [],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    memberpermissions: ["MANAGE_SERVER"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 1,
    maxargs: 0,
    minplusargs: 0,
    maxplusargs: 0,
    argsmissing_message: "You are missing the text you wanna add to the message!",
    argstoomany_message: "You are having too many arguments for this Command!",
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try{
      if(!args[0])
        return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a Text`)
            .setDescription(`Usage: \`${prefix}say <Your Text>\``)]
        });
      message.reply(text.substr(0, 2000));
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}
