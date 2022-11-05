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

var attempt = async (rigged = false) => {
  let randVal = randi(1, 50)
  print(rigged)
  if (randVal == 1 || rigged) {
    var channel = await client.channels.fetch(DEFAULT)
    channel.send("THERE'S A BOMB STRAPPED TO MY CHEST")
    print("BOMBINGS")
  }
}

var send = async (id, content) => {
  var channel = await client.channels.fetch(id)
  channel.send(content)
}

client.on('ready', () => {
  print(`${client.user.username}.`)
  attempt()
  setInterval(attempt, 30000)
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

client.login(token);