#!/usr/bin/env node
/**
 * Resister new user
 */
const commander = require('commander')
const co = require('co')
const { User } = require('../server/models')
const calcPasswordHash = require('../server/helpers/calc_password_hash')
const mongoose = require('mongoose')
const { url } = require('../env')

commander
  .option('-u, --user <user>', 'user key')
  .option('-p, --password <password>', 'password')
  .option('-f, --force', 'overwrite if exists')
  .parse(process.argv)

registerUser(commander)

function registerUser (options) {
  let {
    user: userKey,
    password,
    force
  } = options
  if (!userKey || !password) {
    options.outputHelp()
    return
  }
  co(function * () {
    let passwordHash = calcPasswordHash(password)
    mongoose.connect(url.MONGO)
    let exist = yield User.findOne({ userKey }).exec()
    if (exist && force) {
      yield User.remove({ userKey }).exec()
    }
    if (exist && !force) {
      throw new Error(`User "${userKey}" is already used.`)
    }
    yield User({
      userKey,
      passwordHash
    }).save()
    console.log(`
Registeration successed.
`)
  }).catch(e => {
    console.error(e)
  }).then(() => {
    mongoose.disconnect()
  })
}
