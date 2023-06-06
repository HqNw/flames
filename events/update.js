const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const util = require('minecraft-server-util');
const fs = require("fs");

const options = {
    timeout: 1000 * 2, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
let servers = [];
let result;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    ;(async () => {
    console.log(`${client.user.username} has logged on.`)
    // client.user.setActivity('Half Life 3', { type: 'PLAYING' })
    //   .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    //   .catch(console.error);

    // Get our server
    const guild = client.guilds.cache.get('978633805151760455');

    // Get our stats channels
    const totalUsers = client.channels.cache.get('1104804831832588350');

    // Check every 30 seconds for changes
    setInterval(function() {
      console.log('Getting stats update..')
      
      totalUsers.messages.fetchPinned()
        .then(messages => {
        console.log(messages.size)
        messages.forEach(message =>{
              console.log(message.id)

              fs.readFileSync("./serverList.json").toString().trim().split("\n").forEach(function(line, index, arr) {
                console.log(index + " " + line);
                servers.push(JSON.parse(line));
              });
    
              if (servers.length !== messages.size) {
                console.error("run the sync command or pin the massages if not pinned")
              }

            
        })
        
        
        })


    }, 5000)

    })()


  },
};

