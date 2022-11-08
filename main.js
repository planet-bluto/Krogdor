// CONSTANTS:
// ***************************
const print = console.log
require('dotenv').config({ path: `${__dirname}/.env` })
const token = process.env['token']
const debug = process.env['debug']
const DEFAULT = (debug ? "922797200814264361" : "518671807503532062")

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

// VARIABLES
var sleep_mode = false
var chain = false
var chainRemaining = 0
//
//
//
//
// FUNCTIONS:
// ***************************
var attempt = async (rigged = null) => {
  var channel = await client.channels.fetch(DEFAULT)

  if (rigged == null) {
    // NO DEAD CHAT 💀
    let lastMessageCollect = await channel.messages.fetch({ limit: 1 })
    let lastMessage = lastMessageCollect.first()
    let timeDiff = Math.abs(lastMessage.createdTimestamp - Date.now())

    var should_sleep = (timeDiff > 300000 || lastMessage.author.id == client.user.id)
    if (should_sleep && !sleep_mode) { print("chat is dead, I'ma wait..."); sleep_mode = true; return }

    if (sleep_mode == true && !should_sleep) {
      print("Oh, chat is back!")
      sleep_mode = false
    }
  }

  let randVal = randi(1, 100000)
  let randVidVal = randi(1, 100)
  let randChainVal = randi(1, 25000)
  if (rigged == "chain") {
    print("(manual chain start)")
    randChainVal = 12500
  }
  if (randVal == 50000 || (["video", "text"].includes(rigged))) {
    if (rigged == "video") {randVidVal = 1}
    if (rigged == "video" || randVidVal == 1) {
      channel.send({
        files: ["./THERE'S A BOMB STRAPPED TO MY CHEST.mp4"]
      })
      if (!chain) {print("BOMBINGS (video)")}
    }
    if ((rigged == "text" || randVidVal > 1)) {
      return channel.send("THERE'S A BOMB STRAPPED TO MY CHEST")
      if (!chain) {print("BOMBINGS")}
    }
  }

  if (chain) {
    if (chainRemaining > 0) {
      print(`${chainRemaining}...`)
      setTimeout(() => {attempt("text")}, 5000)
      chainRemaining--
    } else {
      chain = false
    }
    return
  }

  if (rigged == "chain" || (rigged == null && randChainVal == 1)) {
    chainRemaining = Math.round(Math.sin(randi(1, 10)/10)*10)
    print(`${chainRemaining} CHAIN:`)
    chain = true
    attempt("text")
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
  setInterval(attempt, 1000)
})

client.on('messageCreate', message => {
  if (message.channel == DEFAULT && message.mentions.users.has(client.user.id)) {
    attempt(randi(1, 10) == 1 ? "video" : "text")
  }
})

process.stdin.on("data", data => {
  var input = data.toString().trim()
  var args = input.split(" ")
  var cmd = args.shift()
  switch (cmd) {
    case 'bomb':
      attempt(args[0])
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