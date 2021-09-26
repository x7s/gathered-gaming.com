const { MessageEmbed } = require("discord.js");
const request = require("request");
const ee = require("../../botconfig/embed.json");
const moment = require("moment");

module.exports = {
    name: "playerinfo",
    category: "Information",
    usage: "playerinfo <war3> <CS-Nickname>",
    aliases: ["playerinfo", "pli"],
    description: "Ще ви покажа статистиката на играч в сървърите на Example.com",
    cooldown: 1,
  
    run: async (client, message, args) => {
        if(!args.length)
            return message.channel.send(`Не ми предоставихте **Сървър** и/или **CS-Nickname** за търсене, ${message.author}!\nОпитайте с **!pli war3 Player**.`)

        let url = 'https://www.fps.gathered-gaming.com/playerapi.php?s=' + args[0] + '&name=' + args[1];

        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            
                let firstJoin = moment(body['first_join']).fromNow();
                let lastJoin = moment(body['last_join']).fromNow();
                let intSeconds = parseInt(body['connection_time']);
                var connectionTime =  Math.floor(moment.duration(intSeconds,'seconds').asHours()) + ' hours, ' + moment.duration(intSeconds,'seconds').minutes() + ' minutes and ' + moment.duration(intSeconds,'seconds').seconds() + ' seconds';

                const plinfo = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`Статистика на играч: ${body['name']} в ${body['ServerName']}`)
                    .addField('Убийства: ', body['kills'], true)
                    .addField('Assists: ', body['assists'], true)
                    .addField('Умирания: ', body['deaths'], true)
					.addField('В главата: ', body['hs'], true)
                    .addField('Умение: ', body['skill'], true)
                    .addField('Shots: ', body['shots'], true)
                    .addField('Изтрели: ', body['hits'], true)
                    .addField('Щети: ', body['dmg'], true)
					.addField('Поставил бомба: ', body['bombplants'], true)
                    .addField('Обезвредил: ', body['bombdefused'], true)
					.addField('Рундове като T: ', `***${body['wint']}***  спечелени от ***${body['roundt']}*** рунда`, true)
                    .addField('Рундове като CT: ', `***${body['winct']}***  спечелини от ***${body['roundct']}*** рунда`, true)
                    .addField('Първо влизане: ', firstJoin, true)
                    .addField('Последно влизане: ', lastJoin, true)
					.addField('Connections: ', body['connects'], true)
                    .addField('Изиграно време: ', `${connectionTime}`, true)
					.setTimestamp()
                    .setFooter(ee.footertext, ee.footericon);
                    message.reply({
                        embeds: [plinfo]
                      });
        }
        )}
};