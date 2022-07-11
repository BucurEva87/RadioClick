const irc = require('irc')
const settings = require('./settings')
const scraper = require('./puppeteer')
const Archiver = require('./Archiver')
const Color = require('./Color')
const color = new Color

const archiver = new Archiver('radioclick.db')

const server = 'irc.RadioClick.ro'
const botName = 'CutiutaMuzicala'
const client = new irc.Client(server, botName, settings)

const events = {
  'registered': onRegistered,
  'join': onJoin,
  'part': onPart,
  'names': onNames,
  'notice': onNotice,
  'message': onMessage,
  'invite': onInvite,
  'whois': onWhois,
  'nick': onNick,
  'kick': onKick,
  'kill': onKill,
  'quit': onQuit,
  'error': onError
}

for (let event in events)
  client.addListener(event, events[event])

function onRegistered() {
  console.log(`Joined server ${server}`)
}

function onJoin(channel, nick, message) {
  if (nick == botName)
    console.log(`I joined channel ${channel}`)
  else
    console.log(`${nick} joined channel ${channel}`)
}

function onPart(channel, nick, reason) {}

function onNames(channel, nicks) {}

function onNotice(nick, to, text, message) {}

async function onMessage(nick, to, text, message) {
  // client.say(this.channel, `[You0,4Tube] Titlu: 4`)
  if (text == '!like') {
    const songName = await scraper.retrieveSongName()
    if (songName == 'DJERROR') {
      client.say(to, color.bolditalic('Acest DJ a decis sa nu faca publice titlurile melodiilor, asadar nu pot opera pe timpul emisiei sale'))
      return
    }
    const entry = archiver.select(`SELECT * FROM songs WHERE title = ?`, [songName])

    if (!entry) {
      archiver.insert(`INSERT INTO songs (
        title, likes, likers
      ) VALUES (
        @title, @likes, @likers
      )`, {
        title: songName,
        likes: 1,
        likers: nick
      })
    }
    else {
      if (entry.likers.split(',').map(n => n.toLowerCase()).includes(nick.toLowerCase())) {
        archiver.update(`UPDATE songs SET likes = ? WHERE title = ?`, [+entry.likes + 1, entry.title])
      } else {
        archiver.update(`UPDATE songs SET likes = ?, likers = ? WHERE title = ?`, [+entry.likes + 1, `${entry.likers},${nick}`, entry.title])
      }
    }

    client.say(to, color.songRobot('[userName] apreciaza melodia [songName]', songName, nick))
  } else if (text == '!topsong') {
    const result = archiver.select(`SELECT * FROM songs ORDER BY likes DESC`, [], true)[0]
    const likes = result.likes

    client.say(to, color.songRobot(`Melodia [songName] este cea mai votata melodie, avand ${likes} ${likes == 1 ? 'like' : likes % 100 < 20 ? 'likeuri' : 'de likeuri'}.`, result.title))
  } else if (text == '!votes') {
    const songName = await scraper.retrieveSongName()
    if (songName == 'DJERROR') {
      client.say(to, color.bolditalic('Acest DJ a decis sa nu faca publice titlurile melodiilor, asadar nu pot opera pe timpul emisiei sale'))
      return
    }
    const entry = archiver.select(`SELECT * FROM songs WHERE title = ?`, [songName])

    if (!entry) {
      client.say(to, color.songRobot(`Melodia [songName] nu are niciun like.`, songName))
    } else {
      const likes = entry.likes
      client.say(to, color.songRobot(`Melodia [songName] are ${likes} ${likes == 1 ? 'like' : likes % 100 < 20 ? 'likeuri' : 'de likeuri'}.`, songName))
    }
  } else if (text == '!song') {
    const songName = await scraper.retrieveSongName()
    if (songName == 'DJERROR') {
      client.say(to, color.bolditalic('Acest DJ a decis sa nu faca publice titlurile melodiilor, asadar nu pot opera pe timpul emisiei sale'))
      return
    }

    client.say(to, color.songRobot('Acum la RadioClick ruleaza melodia [songName].', songName))
  }
}

function onInvite(channel, from, message) {}

function onWhois({ nick, user, host, realname, channels, server, serverInfo, operator }) {}

function onNick(oldNick, newNick, channels, message) {}

function onKick(channel, nick, by, reason, message) {}

function onKill(nick, reason, channels, message) {}

function onQuit(nick, reason, channels, message) {}

function onError(message) {}
