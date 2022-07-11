const Archiver = require('./Archiver.js')
// const { databaseName } = require('./config')
const databaseName = 'radioclick.db'

const archiver = new Archiver(databaseName)

archiver.execute(`CREATE TABLE IF NOT EXISTS songs(
  'title' varchar(50),
  'likes' int,
  'likers' text
)`)

// archiver.execute(`CREATE TABLE IF NOT EXISTS bans(
//     'mask' varchar(128),
//     'issuer' varchar(32),
//     'issued_at' datetime,
//     'expires_at' datetime
// );`)

// archiver.execute(`CREATE TABLE IF NOT EXISTS operators(
//     'nick' varchar(32),
//     'user' varchar(32),
//     'host' varchar(64),
//     'level' int,
//     'overseer' varchar(32),
//     'suspended' datetime,
//     'created_at' datetime,
//     'updated_at' datetime
// );`).execute(`CREATE TABLE IF NOT EXISTS lastlogin(
//     'nick' varchar(32),
//     'user' varchar(32),
//     'host' varchar(64),
//     'joined_at' datetime,
//     'parted_at' datetime,
//     'created_at' datetime,
//     'updated_at' datetime
// );`).execute(`CREATE TABLE IF NOT EXISTS replies(
//     'nick' varchar(32),
//     'message' text,
//     'timestamp' datetime
// );`).insert(`INSERT INTO operators (
//     nick, user, host, level, overseer, suspended, created_at, updated_at
// ) VALUES (
//     @name, @user, @host, @level, @overseer, @suspended, @created_at, @updated_at
// );`, {
//     name: 'Pisicuta',
//     user: 'uid3871632',
//     host: 'black.only.slims.you.if.youre.slim',
//     level: 500,
//     overseer: 'The_One`',
//     suspended: null,
//     created_at: Date.now(),
//     updated_at: Date.now()
// }).insert(`INSERT INTO operators (
//     nick, user, host, level, overseer, suspended, created_at, updated_at
// ) VALUES (
//     @name, @user, @host, @level, @overseer, @suspended, @created_at, @updated_at
// );`, {
//     name: 'The_One`',
//     user: 'Dan',
//     host: 'Bdsm.un.altfel.de.preludiu',
//     level: 500,
//     overseer: 'SYSTEM',
//     suspended: null,
//     created_at: Date.now(),
//     updated_at: Date.now()
// })


