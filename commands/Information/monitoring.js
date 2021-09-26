const { MessageEmbed } = require("discord.js");
const request = require("request");
const ee = require("../../botconfig/embed.json");
const moment = require("moment");

module.exports = {
    name: "monitor",
    category: "Information",
    usage: "mon <IP>:<Port>",
    aliases: ["mon", "monitor"],
    description: "Ще ви покажа информация за сървър рекламиран във мониторинг системата на Example.com",
    cooldown: 1,
  
    run: async (client, message) => {
        try {
            const args = message.content.split(":");
            let serverip = args[0];
            let port = args[1];
            if (serverip && port) {
                message.channel.send(`🔍 Търсене... информация за ${serverip}:${port}`)
            }
            if (!args.length) return message.channel.send(`Не ми предоставихте **IP** и/или **Port** за търсене, ${message.author}!\nОпитайте с **!mon 185.148.145.232:27016**.`)
            if (!args[0]) return message.channel.send('Моля, въведете валидно **IP** за сървър')
            if (!args[1]) return message.channel.send('Моля, въведете валиден **Port** за сървър')
            const url = ('https://www.fps.gathered-gaming.com/api.php?ip=' + `${args[0]}` + '&port=' + `${args[1]}`)

            request(url, { json: true }, (err, res, body) => {
                let splittedDate = body['server_regdata'].substr(0, body['server_regdata'].indexOf(':')).split('-');
                let registerDate = moment(
                    new Date(
                    
                        parseInt(splittedDate[2]),
                        parseInt(splittedDate[1]),
                        parseInt(splittedDate[0])
                    )
                ).fromNow();
                if (err) { return console.log(err); }
                const monitor = new MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(`${body.server_name}`)
                  .setImage('https://image.gametracker.com/images/maps/160x120/cs/' + `${body.server_map}` + '.jpg')
                  .addFields(
                    {
                      name: 'Играчи: ',
                      value: `${body.server_players}` + '/' + `${body.server_maxplayers}`,
                      inline: true
                    },
                    {
                      name: 'Тип мод: ',
                      value: `${body.cid}`,
                      inline: true
                    },
                    {
                      name: 'Добавен от: ',
                      value: `${body.added}`,
                      inline: true
                    },
                    {
                      name: 'Текущ Ранк: ',
                      value: `${body.rank}`,
                      inline: true
                    },
                    {
                      name: 'Най-добър ранг: ',
                      value: `${body.best_rank}`,
                      inline: true
                    },
                    {
                      name: 'Най-лош ранг: ',
                      value: `${body.worst_rank}`,
                      inline: true
                    },
                    {
                      name: 'Рекламиран на: ',
                      value: `${registerDate}`,
                      inline: true
                    },
                    {
                      name: 'Текуща Карта: ',
                      value: `${body.server_map}`,
                      inline: true
                    }
                  )
                  .addField('Подсилване: ', 'Подсилен от ' + `${body.boosted}` + ' за ' + `${body.boostfor}` + ' часа')
                  .setFooter('Powered by FPS-Games.BG', 'https://cdn.discordapp.com/avatars/749691780886429727/e0a67d9c502d5cffd90f74854fbadaa0.webp')
                  message.reply({
                    embeds: [monitor]
                  });
              });
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
