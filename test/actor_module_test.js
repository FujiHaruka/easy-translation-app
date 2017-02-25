const assert = require('assert')
const mongoose = require('mongoose')
const { url } = require('../env')
const models = require('../server/models')
const calcPasswordHash = require('../server/helpers/calc_password_hash')
const {
  Token,
  User
} = models
const actorModule = require('../server/actor_module')

describe('actorModule', function () {
  let userKey = 'demo'
  let password = 'demo'
  let passwordHash = calcPasswordHash(password)

  before(async () => {
    mongoose.connect(url.MONGO)
    await Token.remove({}).exec()
    await User.remove({}).exec()

    await User({ userKey, passwordHash }).save()
  })

  after(() => {
    mongoose.disconnect()
  })

  it('token', async () => {
    let invalidUsers = [{
      userKey: 'demo',
      password: 'a'
    }, {
      userKey: 'a',
      password: 'demo'
    }]
    for (let invalidUser of invalidUsers) {
      let { token, err } = await actorModule.requestToken(invalidUser)
      assert.ok(err)
      assert.ok(!token)
    }

    let invalidToken = 'hoge'
    let invalidRes = await actorModule.validateToken({ userKey, token: invalidToken })
    assert.ok(invalidRes.err)
    assert.ok(!invalidRes.ok)

    let user = { userKey, password }
    let { token, until } = await actorModule.requestToken(user)
    assert.ok(token)
    assert.ok(until)

    let { ok, err } = await actorModule.validateToken({ userKey, token })
    assert.ok(ok)
    assert.ok(!err)
  })
})

/* global describe before after it */
