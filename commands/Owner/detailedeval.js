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
  name: `detailedeval`,
  category: `Owner`,
  aliases: [`detailedevaluate`, "detailevaluate", "detaileval"],
  description: `Eval a Command in detail! (not cutting of the resulted message)`,
  usage: `detailedeval <CODE>`,
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
      splitDescription.forEach(async (m) => {
        evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);
        message.channel.send(evalEmbed);
      });
    } catch (e) {
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`:x: ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};
