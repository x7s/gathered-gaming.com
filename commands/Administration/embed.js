const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "embed",
  category: "Administration",
  aliases: [],
  cooldown: 2,
  usage: "embed <Title> ++ <Description>",
  description: "Resends your Text in an embed",
  memberpermissions: ["ADMINISTRATION"],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 1,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try{
      let title = plusArgs[0];
      let desc = plusArgs.slice(1).join(" ")
      message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(title && desc ? title.substr(0, 256) : "")
        .setDescription(desc ? desc : title ? title.substr(0, 2048) : "")]
      })
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
