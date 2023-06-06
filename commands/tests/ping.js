const wait = require('node:timers/promises').setTimeout;

const util = require('minecraft-server-util');
const { SlashCommandBuilder } = require('discord.js');

const { EmbedBuilder } = require('discord.js');
const internal = require('node:stream');

const options = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
let result;

let IP = 'create.inflamescraft.com';
// let IP = 'create.inflamescraft.com';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
    await interaction.deferReply();

    // The port and options arguments are optional, the
    // port will default to 25565 and the options will
    // use the default options.
    ;(async () => {
      try {
        result = await util.status(IP, 25565, options)
        result["status"] = "online"
      } catch (e){
        let players = '{ "players": { "online": 0, "max": 0, "sample": [] } }'
        result = JSON.parse(players);
        result["status"] = "offline"
      }
      
      console.log(result.players)
      console.log(result.status)

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('server status')
        .setURL('https://iphottub.com')
        .setAuthor({ name: 'iphottub', url: 'https://iphottub.com' })
        .setDescription('[server name here]')
        .setThumbnail('https://iphottub.com/cdn/shop/files/iphottub.png?v=1665172420&width=500')
        .addFields(
          { name: 'Status', value: JSON.stringify(result.status) },
          { name: 'IP', value: IP },
          { name: 'players', value: JSON.stringify(result.players.online) + "/" + JSON.stringify(result.players.max) },
          { name: 'Players Online', value: JSON.stringify(result.players.sample) },

        )
        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://iphottub.com/cdn/shop/products/minecraft-1816996_960_720.png?v=1666553223')
        .setTimestamp()
        .setFooter({ text: 'HqNw', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

      await interaction.editReply({ embeds: [exampleEmbed] })
        .then(() => console.log('Reply sent.'))
        .catch(console.error);  
    })()


    //   await interaction.deferReply();
		// await wait(4000);

    //   await interaction.editReply('Pong!');

    //   await wait(2000);
		// await interaction.editReply('Pong again!');

  },
};
