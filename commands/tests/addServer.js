const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");


const ServerList = "./serverList.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('add server for monitor')
	  .addStringOption(option =>
			option
				.setName('name')
				.setDescription('The server name')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('ip')
				.setDescription('The server ip')
        .setRequired(true)),
  async execute(interaction) {
    let server = {} ;
    server["ip"] = interaction.options.getString('ip');
		server["name"] = interaction.options.getString('name');
   
    console.log(server);

    fs.open(ServerList, "a", (err, fd)=>{
        if(err){
            console.log(err.message);
        }else{
            fs.write(fd, JSON.stringify(server)+"\n" , (err, bytes)=>{
                if(err){
                    console.log(err.message);
                }else{
                    console.log(bytes +' bytes written');
                    interaction.reply("server added")
                }
            })        
        }
    })
    
  },
};

