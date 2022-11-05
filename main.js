const print = console.log

const randi = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const {Client, IntentsBitField} = require('discord.js')
var bits = Object.values(IntentsBitField.Flags).filter(val => { return Number.isInteger(val)})
const client = new Client({ intents: bits })

client.on('ready', () => {
  print(`${client.user.username}.`)
  let attempt = async () => {
    let randVal = randi(1, 50)
    if (randVal == 1) {
      var channel = await client.channels.fetch('518671807503532062')
      channel.send("THERE'S A BOMB STRAPPED TO MY CHEST")
      print("BOMBINGS")
    }
  }
  attempt()
  setInterval(attempt, 30000)
})

client.login('MTAzODIzODM3MTIyODY4MDIyMg.G3WyDn.QmHG7_iGKcYmYHVIsHa0Sybs30vF_u1JBGlqxc');