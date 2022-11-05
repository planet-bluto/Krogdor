// CONSTANTS:
// ***************************
const print = console.log
require('dotenv').config({ path: `${__dirname}/.env` })
const token = process.env['token']
const DEFAULT = "518671807503532062"

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 30,
    prompt: '$ '
})

const randi = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const {Client, IntentsBitField} = require('discord.js')
var bits = Object.values(IntentsBitField.Flags).filter(val => { return Number.isInteger(val)})
const client = new Client({ intents: bits })

// singlular variable
var sleep_mode = false
//
//
//
//
// FUNCTIONS:
// ***************************
var attempt = async (rigged = false) => {
  var channel = await client.channels.fetch(DEFAULT)

  // NO DEAD CHAT 💀
  let lastMessageCollect = await channel.messages.fetch({ limit: 1 })
  let lastMessage = lastMessageCollect.first()
  let timeDiff = Math.abs(lastMessage.createdTimestamp - Date.now())
  if (timeDiff > 3600000) { print("chat is dead, I'ma wait..."); sleep_mode = true; return }

  if (sleep_mode == true) {
    print("Oh, chat is back!")
    sleep_mode = false
  }
  let randVal = randi(1, 50)
  if (randVal == 1 || rigged) {
    channel.send("THERE'S A BOMB STRAPPED TO MY CHEST")
    print("BOMBINGS")
  }
}

var send = async (id, content) => {
  var channel = await client.channels.fetch(id)
  channel.send(content)
}
//
//
//
//
// LISTENERS:
// ***************************
client.on('ready', () => {
  print(`${client.user.username}.`)
  attempt()
  setInterval(attempt, 30000)
})

client.on('messageCreate', message => {
  if (message.channel == DEFAULT && message.mentions.users.has(client.user.id)) {
    attempt(true)
  }
})

process.stdin.on("data", data => {
  var input = data.toString().trim()
  var args = input.split(" ")
  var cmd = args.shift()
  switch (cmd) {
    case 'bomb':
      attempt(true)
    break;
    case 'send':
      send(DEFAULT, args.join(" "))
    break;
  }
})
//
//
//
//
// LOG INTO Krogdor:
// ***************************
client.login(token);