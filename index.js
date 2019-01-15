const dotenv = require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require ('fs')


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})



client.login(process.env.BOT_ENV)
require('http').createServer().listen()

