const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var settings = require(`../../botconfig/settings.json`);
var ee = require(`../../botconfig/embed.json`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `eval`,
  category: `Owner`,
  aliases: [`evaluate`, "evaluate", "eval"],
  description: `Eval a Command!`,
  usage: `eval <CODE>`,
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: settings.ownerIDS,
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      let evaled;
      if (args.join(` `).includes(`token`)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
      evaled = await eval(args.join(` `));
      let string = inspect(evaled);
      if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
      let evalEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Evaluation`)
        .setColor(ee.color);
      const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      });
      let embeds = []
      await splitDescription.forEach(async (m) => {
        evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);
        embeds.push(evalEmbed)
      });
      message.reply({embeds: embeds});
    } catch (e) {
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  },
};
